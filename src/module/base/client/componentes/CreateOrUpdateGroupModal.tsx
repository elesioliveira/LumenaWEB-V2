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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createGroupClient,  updateGroupClient } from "../repository/ClientRepository";
import { bgColorCardsDashBoard, colorNegative, colorOpacity, textFieldStyle } from "../../../../theme/theme";
import { X } from "lucide-react";
import type { GroupClientEntity, GrupoClient } from "../entity/ClientEntity";
import type { GroupDTO } from "../dto/ClientDTO";



interface CreateOrUpdateGroupProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  grupo: GroupClientEntity | null;
}

export function CreateOrUpdateGroupModal({
  open,
  onClose,
  onSuccess,
grupo
}: CreateOrUpdateGroupProps) {
  const {
    register,
    handleSubmit,
    reset,    
  control,
  setValue,
    formState: { errors, isSubmitting },
  } = useForm<GroupDTO>();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (grupo) {
    reset({
      ativo: grupo.ativo,
      desconto: grupo.desconto,
      descricao: grupo.descricao,
      nome: grupo.nome
    });
  } else {
 reset({
        desconto: 0,
        descricao:null,
        nome: null,
    });
  }
}, [grupo, reset]);


  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: GroupDTO) => {
try {
    let result;
  setLoading(true);
  if (grupo === null) {
    result = await createGroupClient(data);
  } else {
    // UPDATE
       const payload: GroupDTO = {
      nome: data.nome,
      descricao: data.descricao,
      desconto: data.desconto,
      ativo: data.ativo,
    };
    result = await updateGroupClient(payload, grupo.id!);
  }

  if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao salvar produto.");
    setToastOpen(true);
    return;
  }

  reset();
  onSuccess();
  onClose();

} catch (error) {
    setToastType("error");
    setToastMsg("Erro ao criar grupo de clientes.");
    setToastOpen(true);
} finally{
  setLoading(false);
}
};


return (
    <>
      {/* TOAST */}
  <Snackbar
    open={toastOpen}
    autoHideDuration={1000}
    onClose={() => setToastOpen(false)}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert severity={toastType} sx={{ width: "100%" }}>
      {toastMsg}
    </Alert>
  </Snackbar>

<Modal open={open} onClose={ onClose}>
<Box
display={"flex"}
flexDirection={"column"}
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95vw", sm: "90vw", md: 620 },
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: bgColorCardsDashBoard,
    borderRadius: 2,
    border: "1px solid rgba(40, 61, 107, 0.4)",
    p: 4,
  }}
>
<Stack display={"flex"} flexDirection={"row"}  justifyContent={"space-between"}>
<Typography fontSize="1.4rem" fontWeight={700} color="#fff">
    {grupo ? "Editar Grupo" : "Novo Grupo"}
</Typography>
  <Box
    onClick={ () => {
      reset();
    onClose();
    }}
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
</Stack>
      {loading && (
      <Stack
      height={200}
      alignItems="center"
      justifyContent="center"
      >
      <CircularProgress color="inherit" />
      <Typography mt={2} color={colorOpacity}>
      Carregando...
      </Typography>
      </Stack>
      )}
{!loading && (   
<form onSubmit={handleSubmit(onSubmit)}>
<Box display={"flex"} flexDirection={"column"} gap={4} mt={4}>
<Box display={"flex"} flexDirection={"column"}  >
<Typography fontWeight={400} color={colorOpacity} fontSize={"1.1rem"}>
Nome *
</Typography>
    <Controller
    name="nome"
    control={control}
    
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="text"
        placeholder="Nome do grupo.."
        sx={textFieldStyle}
        error={!!fieldState.error}
        
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
<Box display={"flex"} flexDirection={"column"} >
<Typography fontWeight={400} color={colorOpacity} fontSize={"1.1rem"}>
Descrição *
</Typography>
    <Controller
    name="descricao"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}      
        fullWidth
        type="text"
        placeholder="descricao"
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
<Box display={"flex"} flexDirection={"column"} >
<Typography fontWeight={400} color={colorOpacity} fontSize={"1.1rem"}>
Desconto Padrão (%)
</Typography>
    <Controller
    name="desconto"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="number"
        placeholder="Aplicar desconto"
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
</Box>
{/* AÇÕES */}
<Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
<Button
        variant="outlined"
        onClick={() => {
         reset();
        onClose();
        }}
        sx={{
             width:150,
          color: colorOpacity,
          border: "1px solid rgba(40, 61, 107, 0.6)",
        }}>
        Cancelar
</Button>
<Button
        type="submit"
        disabled={isSubmitting}
        sx={{
            width:200,
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
      ) : grupo ? (
      "Atualizar"
      ) : (
      "Salvar"
      )}
</Button>
</Stack>
</form>)}
</Box>
</Modal>
    </>
);
}
