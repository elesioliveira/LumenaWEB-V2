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
import type { ClientDetailsEntity, GrupoClient } from "../entity/ClientEntity";
import type { ClientDTO } from "../dto/ClientDTO";
import { fetchEnderecoByCep } from "../repository/ClientRepository";
import { bgColorCardsDashBoard, colorNegative, colorOpacity, textFieldStyle } from "../../../../theme/theme";
import { X } from "lucide-react";
import { tipoClientMocks, ufMocks } from "../mocks/ClientMocks";



interface CreateOrUpdateClientProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  client: ClientDetailsEntity | null;
  grupo: GrupoClient [];
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
        cep: client.bairro,
        cidade: client.cidade,
        complemento: client.complemento,
        documento: client.documento,
        email: client.email,
        grupo: client.grupo,
        nome: client.nome,
        numero: client.numero,
        observacao: client.observacao,
        rua: client.rua,
        telefone: client.telefone
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
        grupo: null,
        nome: null,
        numero: null,
        observacao: null,
        rua: null,
        telefone: null,
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
//   let result;
//   const unidadeDescricao = getUnidadeDescricao(data.un!);
//   if (client === null) {
//     //  CREATE
//     const payload  = {
//       nome: data.nome?.trim(),
//       descricao: data.descricao?.trim(),
//       ativo: data.ativo,
//       un: unidadeDescricao?? "",
//       eanCode: data.eanCode?.trim(),
//       marca_id: Number(data.marca_id),
//       fornecedor_id: Number(data.fornecedor_id),
//       categoria_id: Number(data.categoria_id),
//       preco_custo: parseCurrencyBR(data.preco_custo as unknown as string),
//       preco_venda: parseCurrencyBR(data.preco_venda as unknown as string),
//       estoque_minimo: Number(data.estoque_minimo),
//     };
//     result = await createProduct(payload);
//   } else {
//     // UPDATE
//     const payload: ProductEntity = {
//       id: client.id, // vem da entidade selecionada
//       nome: data.nome?.trim(),
//       data_cadastro: client.data_cadastro,
//       descricao: data.descricao?.trim(),
//       ativo: data.ativo,
//       un:unidadeDescricao ?? client.un,
//       eanCode: data.eanCode?.trim(),
//       marca_id: Number(data.marca_id),
//       fornecedor_id: Number(data.fornecedor_id),
//       categoria_id: Number(data.categoria_id),
//       preco_custo:typeof data.preco_custo === "string" ? parseCurrencyBR(data.preco_custo as unknown as string) : data.preco_custo,
//       preco_venda:typeof data.preco_venda === "string" ? parseCurrencyBR(data.preco_venda as unknown as string) : data.preco_venda,
//       estoque_minimo: Number(data.estoque_minimo),
//     };

//     result = await updateProduct(payload);
//   }

//   if (!result?.success) {
//     setToastType("error");
//     setToastMsg(result?.message ?? "Erro ao salvar produto.");
//     setToastOpen(true);
//     return;
//   }

//   reset();
//   onSuccess();
//   onClose();
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
          error={!!errors.grupo}
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
  name="grupo"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Autocomplete
      options={grupo}
      getOptionLabel={(option) => option.descricao!}
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
          error={!!errors.grupo}
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
    CPF 
  </Typography>
  <Controller
    name="documento"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        fullWidth
        placeholder="CPF/CPNJ"
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
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
        type="number"
        placeholder="(00) 00000-0000"
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
        sx={textFieldStyle}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
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
