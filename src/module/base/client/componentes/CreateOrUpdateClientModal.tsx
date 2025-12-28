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
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { ClientDetailsEntity, GroupClientEntity} from "../entity/ClientEntity";
import type { ClientDTO } from "../dto/ClientDTO";
import { createClientSubmit, fetchEnderecoByCep, updateClient } from "../repository/ClientRepository";
import { bgColorCardsDashBoard, colorNegative, colorOpacity, textFieldStyle } from "../../../../theme/theme";
import { X } from "lucide-react";
import { tipoClientMocks, ufMocks } from "../mocks/ClientMocks";
import { maskCEP, maskCpfCnpj, maskTelefone } from "../../../../shared/MaskUtils";



interface CreateOrUpdateClientProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  client: ClientDetailsEntity | null;
  grupo: GroupClientEntity [];
}

export function CreatOrUpdateClientModal({
  open,
  onClose,
  onSuccess,
client,
  grupo
}: CreateOrUpdateClientProps) {
  const {
    register,
    handleSubmit,
    reset,    
  control,
  setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClientDTO>();
const cep = useWatch({ control, name: "cep" });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [loadingCep, setLoading] = useState(false);

useEffect(() => {
  if (client) {
    reset({
        ativo: client.ativo,
        bairro: client.bairro,
        cep: client.cep,
        cidade: client.cidade,
        cod_uf: client.cod_uf,
        complemento: client.complemento,
        documento: client.documento,
        email: client.email,
        grupo_id: client.grupo_id,
        nome: client.nome,
        numero: client.numero,
        observacao: client.observacao,
        rua: client.rua,
        telefone: client.telefone,
        tipo: client.tipo,
        uf: client.cod_uf
        // cod_uf: client.cod_uf
    });
  } else {
 reset({
      ativo: true,
        bairro:null,
        cep: null,
        cidade: null,
        complemento: null,
        documento: null,
        email:null,
        grupo_id: null,
        nome: null,
        numero: null,
        observacao: null,
        rua: null,
        telefone: null,
        cod_uf:null
    });
  }
}, [client, reset]);



const handleFetchCep = async () => {
  if (!cep) return;

  // remove tudo que não for número
  const cepLimpo = cep.replace(/\D/g, "");

  // valida CEP (8 dígitos)
  if (cepLimpo.length !== 8) return;

  try {
    setLoading(true);

    const result = await fetchEnderecoByCep(cepLimpo);

    setValue("bairro", result.neighborhood ?? "");
    setValue("cidade", result.city ?? "");
    setValue("rua", result.street ?? "");
    setValue("uf", result.state ?? "");
  } catch {
    setToastType("error");
    setToastMsg("Erro ao buscar endereço pelo CEP.");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};


  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: ClientDTO) => {
  let result;
  const uf = ufMocks.find((u) => u.id === data.uf);
  data.uf = uf?.descricao!;
  data.cod_uf = uf?.id !;
  if (client === null) {
    result = await createClientSubmit(data);
  } else {
    const payload : ClientDetailsEntity ={
      ativo: client.ativo,
      bairro: data.bairro,
      cep: data.cep,
      cidade: data.cidade,
      cod_uf: data.cod_uf,
      complemento: data.complemento,
      data_cadastro: client.data_cadastro,
      documento: data.documento,
      email: data.email,
      grupo_id: data.grupo_id,
      id: client.id,
      nome: data.nome,
      numero: data.numero,
      observacao: data.observacao,
      rua: data.rua,
      telefone: data.telefone,
      tipo: data.tipo,
      uf: data.uf
    };
   result = await updateClient(payload);
};
  if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao salvar produto.");
    setToastOpen(true);
    return;
  }
    reset();
    await onSuccess();
    onClose();
}



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
    width: 820,
    height: 800,
    bgcolor: bgColorCardsDashBoard,
    borderRadius: 2,
    border: "1px solid rgba(40, 61, 107, 0.4)",
    p: 4,
    overflow: "auto"
  }}
>
<Stack display={"flex"} flexDirection={"row"} flexGrow={1} justifyContent={"space-between"}>
<Typography fontSize="1.4rem" fontWeight={700} color="#fff" mb={0}>
    {client ? "Editar Cliente" : "Novo Cliente"}
</Typography>
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
</Stack>
      {loadingCep && (
      <Stack
      height={200}
      alignItems="center"
      justifyContent="center"
      >
      <CircularProgress color="inherit" />
      <Typography mt={2} color={colorOpacity}>
      Carregando cep...
      </Typography>
      </Stack>
      )}
  {!loadingCep && (   
<form onSubmit={handleSubmit(onSubmit)}>
<Typography fontWeight={400} color={colorOpacity} fontSize={"1rem"} mt={4}>
    Dados Básicos
</Typography>
<Box display={"grid"}  gridTemplateColumns="repeat(2, 1fr)" gap={2} flexGrow={1} width={"100%"}>
<Box display={"flex"} flexDirection={"column"} flex={1}>  
<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Tipo*
</Typography>
<Controller
  name="tipo"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Autocomplete
      options={tipoClientMocks}
      getOptionLabel={(option) => option.descricao!}
      value={
        tipoClientMocks.find((t) => t.id === field.value) || null
      }
      onChange={(_, newValue) => {
        field.onChange(newValue ? newValue.id : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Selecione o tipo"
          sx={textFieldStyle}
          error={!!errors.tipo}
        />
      )}
      PaperComponent={(props) => (
        <Box
          {...props}
          sx={{
            bgcolor: bgColorCardsDashBoard,
            border: "1px solid rgba(40, 61, 107, 0.4)",
            color: "#FFFF",
          }}
        />
      )}
    />
  )}
/>
</Box>
<Box display={"flex"} flexDirection={"column"} flex={1}>  
<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Grupo*
</Typography>
<Controller
  name="grupo_id"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Autocomplete
      options={grupo}
      getOptionLabel={(option) => option.nome!}
      value={
        grupo.find((m) => m.id === field.value) || null
      }
      onChange={(_, newValue) => {
        field.onChange(newValue ? newValue.id : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Selecione o grupo"
          sx={textFieldStyle}
          error={!!errors.grupo_id}
        />
      )}
      PaperComponent={(props) => (
        <Box
          {...props}
          sx={{
            bgcolor: bgColorCardsDashBoard,
            border: "1px solid rgba(40, 61, 107, 0.4)",
            color: "#FFFF",
          }}
        />
      )}
    />
  )}
/>
</Box>
<Box display="flex" flexDirection="column" flex={1}>
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
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
        placeholder="Nome Completo"
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
<Box display="flex" flexDirection="column" flex={1}>
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    Documento 
  </Typography>
  <Controller
    name="documento"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        onChange={(e) => {
        field.onChange(maskCpfCnpj(e.target.value))
        }}
        placeholder="CPF/CPNJ"
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        inputProps={{ maxLength: 18 }}
      />
    )}
  />
</Box>
</Box>
<Typography fontWeight={400} color={colorOpacity} fontSize={"1rem"} mt={4}>
    Contato
</Typography>
<Box display={"grid"}  gridTemplateColumns="repeat(2, 1fr)" gap={2} flexGrow={1} width={"100%"}>
<Box display="flex" flexDirection="column" flex={1}>
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    Email *
  </Typography>
  <Controller
    name="email"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        placeholder="Email"
        type="email"
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
<Box display="flex" flexDirection="column" flex={1}>
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    Telefone 
  </Typography>
  <Controller
    name="telefone"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="text"
        placeholder="(00) 00000-0000"
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "");
          if (raw.length <= 11) {
            field.onChange(maskTelefone(e.target.value));
          }
        }}
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
</Box>
<Stack flexDirection={"row"} display={"flex"} flexGrow={1} mt={4} gap={2}>
<Box flex={2} flexDirection={"column"}>
<Typography color={"#FFF"} fontSize={"1.1rem"} fontWeight={400}>
    Rua
</Typography>
    <Controller
    name="rua"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="text"
        placeholder="Rua, avenida, etc."
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
<Box flex={1}flexDirection={"column"}>
<Typography color={"#FFF"} fontSize={"1.1rem"} fontWeight={300}>
    Número
</Typography>
    <Controller
    name="numero"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="text"
        placeholder="123"
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
</Stack>
<Stack flexDirection={"row"} display={"flex"} flexGrow={1} mt={4} gap={2}>
<Box flex={1} flexDirection={"column"}>
<Typography color={"#FFF"} fontSize={"1.1rem"} fontWeight={400}>
    Complemento
</Typography>
    <Controller
    name="complemento"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="text"
        placeholder="Apto, Sala, etc."
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
<Box flex={1}flexDirection={"column"}>
<Typography color={"#FFF"} fontSize={"1.1rem"} fontWeight={300}>
    Bairro
</Typography>
    <Controller
    name="bairro"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="text"
        placeholder="Bairro"
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
</Stack>
<Box display={"grid"}  gridTemplateColumns="repeat(3, 1fr)" gap={2} flexGrow={1} width={"100%"}>
<Box display={"flex"} flexDirection={"column"} flex={1}>  
<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  CEP
</Typography>
  <Controller
    name="cep"
    control={control}
    rules={{ required: "00000-000" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="text"
        placeholder="Bairro"
        onChange={(e) => {
          field.onChange(maskCEP(e.target.value))
        }}
        onBlur={handleFetchCep}
        sx={textFieldStyle}
        error={!!errors.cep}
        helperText={errors.cep?.message}
      />
    )}
  />
</Box>
<Box display={"flex"} flexDirection={"column"} flex={1}>  
<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
 Cidade
</Typography>
 <Controller
    name="cidade"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="text"
        placeholder="Cidade"
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
</Box>
<Box display="flex" flexDirection="column" flex={1}>
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    UF *
  </Typography>
<Controller
  name="uf"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Autocomplete
      options={ufMocks}
      getOptionLabel={(option) => option.descricao!}
      value={
        ufMocks.find((uf) => uf.id === field.value) || null
      }
      onChange={(_, newValue) => {
        field.onChange(newValue ? newValue.id : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Selecione o Estado"
          sx={textFieldStyle}
          error={!!errors.uf}
        />
      )}
      PaperComponent={(props) => (
        <Box
          {...props}
          sx={{
            bgcolor: bgColorCardsDashBoard,
            border: "1px solid rgba(40, 61, 107, 0.4)",
            color: "#FFFF",
          }}
        />
      )}
    />
  )}
/>
</Box>
</Box>
<Box flex={1}flexDirection={"column"}  flexGrow={1} mt={4}>
<Typography color={"#FFF"} fontSize={"1.1rem"} fontWeight={300}>
    Observações
</Typography>
    <Controller
    name="observacao"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        type="text"
        placeholder="Observações adicionais..."
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
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
      ) : client ? (
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
