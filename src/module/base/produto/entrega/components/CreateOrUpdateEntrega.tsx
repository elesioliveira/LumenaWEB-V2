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
import type { EntregaDTO } from "../dto/EntregaDTO";
import type { EntregaEntity } from "../entity/EntregaEntity";
import { createEntrega, updateEntrega } from "../repository/EntregaRepository";
import { maskCurrency, parseCurrencyBR } from "../../../../../shared/MaskUtils";

interface CreateOrUpdateEntregaModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  entrega: EntregaEntity | null
}

export function CreateOrUpdateEntregaModal({
  open,
  onClose,
  onSuccess,
  entrega: entrega
}: CreateOrUpdateEntregaModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EntregaDTO>();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

useEffect(() => {
  if (entrega) {
    reset({
      nome: entrega.nome,
      prazo: entrega.prazo,
        custo_base: maskCurrency(entrega.custo_base),
    });
  } else {
    reset({
       nome: null,
      prazo: null,
        custo_base: 0,
    }); //garante modal limpa ao criar novo
  }

}, [entrega, reset]);



  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: EntregaDTO) => {
  let result;

  if (entrega === null) {
    // CREATE
    const payload: EntregaDTO = {
      nome: data.nome,
      prazo: data.prazo,
      custo_base: parseCurrencyBR(`${data.custo_base}`),
    };
    result = await createEntrega(payload);
  } else {
    // UPDATE
    const payload: EntregaEntity = {
      id: entrega.id,
      nome: data.nome,
      prazo: data.prazo,
      ativo: entrega.ativo,
      data_cadastro: null,
      custo_base: parseCurrencyBR(`${data.custo_base}`),
    };
    result = await updateEntrega(payload);
  }

  if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao salvar entrega.");
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
    {entrega ? "Editar Entrega" : "Nova Entrega"}
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
<Stack display={"flex"} flexDirection={"row"} flexGrow={1} gap={2}>
<Box display={"flex"} flexDirection={"column"} flex={1}>
<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
Prazo de Entrega
</Typography>
<TextField
fullWidth
multiline
rows={1} // 🔑 controla a altura
placeholder="Ex: 5 a 7 dias úteis"
{...register("prazo")}
sx={textFieldStyle}
/>
</Box>
<Box display={"flex"} flexDirection={"column"} flex={1}>
<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
Custo Base (R$)
</Typography>
<TextField
fullWidth
multiline
placeholder="Ex: R$ 1.250,00"
rows={1} // 🔑 controla a altura
inputMode="numeric"
{...register("custo_base")}
  onChange={(e) => {
    const formatted = maskCurrency(e.target.value);
    e.target.value = formatted;
  }}
sx={textFieldStyle}
/>
</Box>
</Stack>
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
      ) : entrega ? (
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
