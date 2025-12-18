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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { bgColorCardsDashBoard, colorOpacity, textFieldStyle } from "../../../../../theme/theme";
import type { MarkEntity } from "../entity/MarkEntity";
import type { MarkDTO } from "../dto/MarkDTO";
import { createMark, updateMark } from "../repository/MarkRepository";

interface CreateOrUpdateCategoryModadlProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  mark: MarkEntity | null
}

export function CreateOrUpdateMarkModal({
  open,
  onClose,
  onSuccess,
  mark: category
}: CreateOrUpdateCategoryModadlProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MarkDTO>();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

useEffect(() => {
  if (category) {
    reset({
      nome: category.nome,
      website: category.website,
    });
  } else {
    reset({
       nome: null,
      website: null,
    }); //garante modal limpa ao criar novo
  }

}, [category, reset]);



  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: MarkDTO) => {
  let result;

  if (category === null) {
    // 🔹 CREATE
    const payload: MarkDTO = {
      nome: data.nome,
      website: data.website
    };
    result = await createMark(payload);
  } else {
    // UPDATE
    const payload: MarkEntity = {
      id: category.id, // vem da entidade selecionada
      nome: data.nome,
      website: data.website,
      ativo: category.ativo,
      empresa_id: category.empresa_id,
      data_cadastro: null,
      qtd: null
    };

    result = await updateMark(payload);
  }

  if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao salvar marca.");
    setToastOpen(true);
    return;
  }

  reset();
  onSuccess();
  onClose();
};


return (
<Modal open={open} onClose={ onClose}>
<Box
display={"flex"}
flexDirection={"column"}
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    bgcolor: bgColorCardsDashBoard,
    borderRadius: 2,
    border: "1px solid rgba(40, 61, 107, 0.4)",
    p: 4,
  }}
>
  {/* TOAST */}
  <Snackbar
    open={toastOpen}
    autoHideDuration={2500}
    onClose={() => setToastOpen(false)}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert severity={toastType} sx={{ width: "100%" }}>
      {toastMsg}
    </Alert>
  </Snackbar>

  <Typography fontSize="1.4rem" fontWeight={700} color="#fff" mb={3}>
    {category ? "Editar Marca" : "Nova Marca"}
  </Typography>

  <form onSubmit={handleSubmit(onSubmit)}>
<Box display={"flex"} flexDirection={"column"}>
        {/* Nome */}
                  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    Nome
  </Typography>
      <TextField 
      
        placeholder="Nome"
        {...register("nome", { required: "Campo obrigatório" })}
        error={!!errors.nome}
        helperText={errors.nome?.message}
        sx={textFieldStyle}
      />
</Box>
      <Box display={"flex"} flexDirection={"column"}>
        {/* Descricao */}
    <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    Descrição
  </Typography>
      <TextField
fullWidth
multiline
rows={1} // 🔑 controla a altura
placeholder="Website"
{...register("website")}
sx={textFieldStyle}
/>
      </Box>
    {/* AÇÕES */}
    <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
      <Button
        variant="outlined"
        onClick={onClose}
        sx={{
          color: colorOpacity,
          border: "1px solid rgba(40, 61, 107, 0.6)",
        }}
      >
        Cancelar
      </Button>

      <Button
        type="submit"
        disabled={isSubmitting}
        sx={{
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
        px: 3,}}>
      {isSubmitting ? (
      <CircularProgress size={26} />
      ) : category ? (
      "Atualizar"
      ) : (
      "Salvar"
      )}
      </Button>
    </Stack>
  </form>
</Box>
</Modal>
);
}
