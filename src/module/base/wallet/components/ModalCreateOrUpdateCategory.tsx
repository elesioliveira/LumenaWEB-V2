import { Controller, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { bgColorCardsDashBoard, colorNegative, colorOpacity, textFieldStyle } from "../../../../theme/theme";
import { X } from "lucide-react";
import type { CategoryDTO, CategoryModalDTO } from "../dto/WalletDTO";
import { categoriasCores, categoriasCoresView, tipoReceita } from "../mocks/WalletMocks";
import { submitNewCategory, submitUpdateCategory } from "../repository/WalletRepository";



interface CreateOrUpdateClientProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  category: CategoryDTO | null;
}

export function CreateOrUpdateCategoryWallet({
  open,
  onClose,
  onSuccess,
  category,
}: CreateOrUpdateClientProps) {
  const {
    register,
    handleSubmit,
    reset,    
  control,
  setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryModalDTO>();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

useEffect(() => {
  if (category) {
 const cor = categoriasCoresView.find((c)=> c.cor === category.cor);
 const tipo = tipoReceita.find((t)=> t.label === category.tipo);
    reset({
      nome: category.nome,
      tipo: tipo!.id,
      cor: cor!.id,
      descricao:category.descricao
    });
  } else {
 reset({
      nome: null,
      tipo: null,
      cor: null,
      descricao:null,
    });
  }
}, [category, reset]);






  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: CategoryModalDTO) => {
  let result;

  // 1️⃣ Buscar a cor selecionada
  const corSelecionada = categoriasCores.find(
    (c) => c.id === Number(data.cor)
  );

  if (!corSelecionada) {
    setToastType("error");
    setToastMsg("Cor inválida selecionada.");
    setToastOpen(true);
    return;
  }

  // Montar payload final (DERIVADO)
  const payload = {
    ...data,
    tipo: corSelecionada.tipo, // Receita | Despesa
    cor: corSelecionada.cor,   // HEX
    ativo: category?.ativo ?? true,
  };



  // 3️⃣ Persistência
  if (!category) {
    result = await submitNewCategory(payload);
  } else {
    result = await submitUpdateCategory(payload, category.id);
  }

  // 4️⃣ Feedback
  if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao salvar categoria.");
    setToastOpen(true);
    return;
  }

  reset();
  await onSuccess();
  onClose();
};




return (
    <>
      {/* TOAST */}
  <Snackbar
    open={toastOpen}
    autoHideDuration={1000}
    onClose={() => setToastOpen(false)}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}>
    <Alert severity={toastType} sx={{ width: "100%" }}>
      {toastMsg}
    </Alert>
  </Snackbar>

<Dialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      bgcolor: bgColorCardsDashBoard,
      borderRadius: 2,
      border: "1px solid rgba(40, 61, 107, 0.4)",
    },
  }}
>
  {/* HEADER */}
  <DialogTitle
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#fff",
      fontSize: "1.4rem",
      fontWeight: 700,
      px: 4,
      pt: 3,
      pb: 2,
    }}
  >
    {category ? "Editar Categoria" : "Nova Categoria"}

    <Box
      onClick={onClose}
      sx={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        cursor: "pointer",
        color: colorOpacity,
        transition: "all 0.25s ease",
        "&:hover": {
          color: colorNegative,
          backgroundColor: "rgba(255, 80, 80, 0.15)",
          boxShadow: "0 0 12px rgba(255, 80, 80, 0.45)",
          transform: "rotate(90deg) scale(1.05)",
        },
      }}
    >
      <X size={28} />
    </Box>
  </DialogTitle>

  {/* CONTENT */}
  <DialogContent
    dividers
    sx={{
      px: 4,
      py: 3,
      color: "#fff",
    }}
  >
    <form onSubmit={handleSubmit(onSubmit)} id="category-form">
      <Typography
        color={colorOpacity}
        fontWeight={300}
        fontSize="1rem"
        mb={1}
      >
        Nome*
      </Typography>
      <TextField
        fullWidth
        placeholder="Nome da categoria"
        inputMode="text"
        required
        error={!!errors.nome}
        helperText={errors.nome?.message}
        {...register("nome", {
          required: "Nome é obrigatório",
        })}
        sx={textFieldStyle}
      />
      <Stack display={"flex"} flexDirection={"row"} gap={2} mt={4}>
        <Box display={"flex"} flexDirection={"column"} flex={1}>
          <Typography
          color={colorOpacity}
          fontWeight={300}
          fontSize="1rem"
          mb={1}
        >
          Tipo*
        </Typography>
        <Controller
        name="tipo"
        control={control}
        rules={{ required: "Tipo é obrigatório" }}
        render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          select
          label="Tipo"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  bgcolor: bgColorCardsDashBoard,
                  borderRadius: 1,
                  color: "#FFFF",
                },
              },
            },
          }}
          sx={textFieldStyle}
        >
          {tipoReceita.map((r) => (
            <MenuItem key={r.id} value={r.id}>
              {r.label}
            </MenuItem>
          ))}
        </TextField>
        )}
        />
        </Box>
        <Box display={"flex"} flexDirection={"column"} flex={1}>
          <Typography
          color={colorOpacity}
          fontWeight={300}
          fontSize="1rem"
          mb={1}
        >
          Cor*
        </Typography>
<Controller
  name="cor"
  control={control}
  rules={{ required: "Selecione uma cor" }}
  render={({ field, fieldState }) => (
    <TextField
      {...field}
      select
      fullWidth
      label="Categoria / Cor"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            sx: {
              bgcolor: bgColorCardsDashBoard,
              borderRadius: 1,
              color: "#FFFF",
            },
          },
        },
      }}
      sx={textFieldStyle}
    >
      <MenuItem value="" disabled>
        Selecione uma opção
      </MenuItem>

      {categoriasCoresView.map((c) => (
        <MenuItem key={c.id} value={c.id}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                bgcolor: c.cor,
              }}
            />
            <Typography variant="body2">
              {c.labelFinal}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  )}
/>

        </Box>
      </Stack>
          <Typography
          color={colorOpacity}
          fontWeight={300}
          fontSize="1rem"
          mb={1}
          mt={4}
        >
          Descrição*
        </Typography>
        <TextField
          fullWidth
          rows={4}
          multiline
          placeholder="Descrição da categoria"
          inputMode="text"
          required
          error={!!errors.descricao}
          helperText={errors.descricao?.message}
          {...register("descricao", {
            required: "Descrição é obrigatório",
          })}
          sx={textFieldStyle}
        />
      {/* SEUS CAMPOS AQUI */}
    </form>
  </DialogContent>

  {/* ACTIONS */}
  <DialogActions
    sx={{
      px: 4,
      py: 3,
      borderTop: "1px solid rgba(40, 61, 107, 0.4)",
      bgcolor: bgColorCardsDashBoard,
    }}
  >
    <Button
      variant="outlined"
      onClick={() => {
        reset();
        onClose();
      }}
      sx={{
        width: 150,
        color: colorOpacity,
        border: "1px solid rgba(40, 61, 107, 0.6)",
      }}
    >
      Cancelar
    </Button>

    <Button
      type="submit"
      form="category-form"
      disabled={isSubmitting}
      sx={{
        width: 200,
        background: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
        boxShadow: "0 0 20px rgba(245,159,10,0.35)",
        transition: "0.25s ease",
        "&:hover": {
          background: "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
          boxShadow: "0 0 25px rgba(245,159,10,0.55)",
          transform: "translateY(-1px)",
        },
        color: "#fff",
        fontWeight: 600,
        px: 3,
      }}
    >
      {isSubmitting ? (
        <CircularProgress size={26} />
      ) : category ? (
        "Atualizar"
      ) : (
        "Salvar"
      )}
    </Button>
  </DialogActions>
</Dialog>

    </>
);
}
