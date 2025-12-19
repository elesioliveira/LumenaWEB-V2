import { Controller } from "react-hook-form";
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
import { bgColorCardsDashBoard, colorOpacity, textFieldStyle } from "../../../../../theme/theme";
import type { CategoryProduct, FornecedorProduct, MarkProduct, ProductEntity } from "../entity/ProductEntity";
import type { ProductDTO } from "../dto/ProdutoDTO";
import { createProduct, updateProduct } from "../repository/ProductRepository";
import { maskCurrency } from "../../../../../shared/MaskUtils";
import { unidadeMock } from "../../../../../shared/Mocks";
import type { MarkEntity } from "../../marca/entity/MarkEntity";
import type { FornecedorEntity } from "../../fornecedor/entity/FornecedorEntity";
import type { CategoryEntity } from "../../categoria/entity/CategoryEntity";

const categoriasMock = [
  { id: 1, nome: "Eletrônicos" },
  { id: 2, nome: "Alimentos" },
  { id: 3, nome: "Vestuário" },
];

const marcasMock = [
  { id: 1, nome: "Marca A" },
  { id: 2, nome: "Marca B" },
];
const fornecedorMock = [
  { id: 1, nome: "Marca A" },
  { id: 2, nome: "Marca B" },
];




interface CreateOrUpdateProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  produto: ProductEntity | null;
  marcas: MarkProduct [];
  fornecedores: FornecedorProduct [];
  categories: CategoryProduct [];
}

export function CreateOrUpdateProductModal({
  open,
  onClose,
  onSuccess,
  produto: product,
  categories,
  marcas,
  fornecedores
}: CreateOrUpdateProductModalProps) {
  const {
    register,
    handleSubmit,
    reset,    
  control,
    formState: { errors, isSubmitting },
  } = useForm<ProductDTO>();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

useEffect(() => {
  if (product) {
    reset({
      eanCode: product.eanCode ?? null,
      ativo: product.ativo ? true : false,
      nome: product.nome ?? null,
      categoria_id: product.categoria_id ?? '',
      marca_id: product.marca_id ?? '',
      un: product.un ?? '',
      preco_custo: product.preco_custo ?? 0,
      preco_venda: product.preco_venda ?? 0,
      estoque_minimo: product.estoque_minimo ?? 0,
      descricao: product.descricao ??null,
      fornecedor_id: product.fornecedor_id ??'',
    
    });
  } else {
 reset({
      eanCode:  null,
      ativo: true,
      nome:  null,
      categoria_id:  '',
      marca_id: '',
      un:  '',
      preco_custo:  0,
      preco_venda:  0,
      estoque_minimo:  0,
      descricao: null,
      fornecedor_id:  '',
    
    });
  }
}, [product, reset]);



  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: ProductDTO) => {
  let result;

  if (product === null) {
    // 🔹 CREATE
    const payload: ProductDTO = {
      nome: data.nome,
      descricao: data.descricao,
      ativo: data.ativo,
      un: data.un ?? '',
      eanCode: data.eanCode,
      marca_id: data.marca_id,
      fornecedor_id: data.fornecedor_id,
      categoria_id: data.categoria_id,
      preco_custo: data.preco_custo,
      preco_venda: data.preco_venda,
      estoque_minimo: data.estoque_minimo
    };
    result = await createProduct(payload);
  } else {
    // UPDATE
    const payload: ProductEntity = {
      id: product.id, // vem da entidade selecionada
      nome: data.nome,
      descricao: data.descricao,
      ativo: product.ativo,
      empresa_id: product.empresa_id,
      data_cadastro: product.data_cadastro,
    };

    result = await updateProduct(payload);
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
    width: 620,
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

  <Typography fontSize="1.4rem" fontWeight={700} color="#fff" mb={0}>
    {product ? "Editar Produto" : "Novo Produto"}
  </Typography>

  <form onSubmit={handleSubmit(onSubmit)}>
<Stack gap={2} display={"flex"} flexDirection={"row"} flexGrow={1}>
  <Box display={"flex"} flexDirection={"column"} flex={1}>
      {/* Nome */}
                <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Código EAN
  </Typography>
    <TextField 
    
      placeholder="Código de barras"
      {...register("eanCode", { required: "Campo obrigatório" })}
      error={!!errors.eanCode}
      helperText={errors.eanCode?.message}
      sx={textFieldStyle}
    />
  </Box>
  <Box display={"flex"} flexDirection={"column"} flex={1}>
    {/* Nome */}
              <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Ativo
  </Typography>
<TextField
  select
  sx={textFieldStyle}
  SelectProps={{
    MenuProps: {
      PaperProps: {
        sx: {
          bgcolor: bgColorCardsDashBoard,
          borderRadius: 1,
          color:"#FFFF"
        },
      },
    },
  }}
>
  <MenuItem value="true">Ativo</MenuItem>
  <MenuItem value="false">Inativo</MenuItem>
</TextField>


  </Box>
</Stack>
    <Box display={"flex"} flexDirection={"column"}>
    {/* Descricao */}
    <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    Nome do Produto
    </Typography>
    <TextField
    fullWidth
    multiline
    rows={1} // 🔑 controla a altura
    placeholder="Nome do Produto"
    {...register("nome", { required: "Campo obrigatório" })}
    sx={textFieldStyle}
    />
    </Box>
<Stack gap={2} display={"flex"} flexDirection={"row"} flexGrow={1}>
  <Box display={"flex"} flexDirection={"column"} flex={1}>

<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Categoria
  </Typography>
<Controller
  name="categoria_id"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Autocomplete
      options={categories}
      getOptionLabel={(option) => option.nome}
      value={
        categories.find((c) => c.id === field.value) || null
      }
      onChange={(_, newValue) => {
        field.onChange(newValue ? newValue.id : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Selecione a categoria"
          sx={textFieldStyle}
          error={!!errors.categoria_id}
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
  Marca
  </Typography>
<Controller
  name="marca_id"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Autocomplete
      options={marcas}
      getOptionLabel={(option) => option.nome}
      value={
        marcas.find((m) => m.id === field.value) || null
      }
      onChange={(_, newValue) => {
        field.onChange(newValue ? newValue.id : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Selecione a marca"
          sx={textFieldStyle}
          error={!!errors.marca_id}
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
</Stack>
<Stack display={"flex"} flexDirection={"row"} flexGrow={1} gap={2}>
    <Box display={"flex"} flexDirection={"column"} flex={1}>  

  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Fornecedor
  </Typography>
<Controller
  name="fornecedor_id"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Autocomplete
      options={fornecedores}
      getOptionLabel={(option) => option.nome}
      value={
        fornecedores.find((f) => f.id === field.value) || null
      }
      onChange={(_, newValue) => {
        field.onChange(newValue ? newValue.id : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Selecione o fornecedor"
          sx={textFieldStyle}
          error={!!errors.fornecedor_id}
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
  Unidade
  </Typography>
<TextField
  select
  {...register("un", { required: true })}
   sx={textFieldStyle}
  SelectProps={{
    MenuProps: {
      PaperProps: {
        sx: {
          bgcolor: bgColorCardsDashBoard,
          borderRadius: 1,
          color:"#FFFF"
        },
      },
    },
  }}
>
  {unidadeMock.map((cat) => (
    <MenuItem key={cat.nome} value={cat.nome}>
      {cat.nome}
    </MenuItem>
  ))}
</TextField>
  </Box>
</Stack>
<Box
  display="grid"
  gridTemplateColumns="repeat(3, 1fr)"
  gap={2}
>
    <Box display={"flex"} flexDirection={"column"} flex={1}>  
    {/* Nome */}
              <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Estoque
  </Typography>
  <TextField 

    placeholder="0"
    {...register("estoque_minimo", { required: "Campo obrigatório" })}
    error={!!errors.estoque_minimo}
    helperText={errors.estoque_minimo?.message}
    sx={textFieldStyle}
  />
  </Box>

  <Box display={"flex"} flexDirection={"column"} flex={1}>  
    {/* Nome */}
              <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
 Preço de Custo (R$)
  </Typography>
<TextField
  placeholder="R$ 0,00"
  inputMode="numeric"
  {...register("preco_custo")}
  onChange={(e) => {
    e.target.value = maskCurrency(e.target.value);
  }}
  sx={textFieldStyle}
/>

  </Box>
  <Box display={"flex"} flexDirection={"column"} flex={1}>  
    {/* Nome */}
              <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
 Preço de Venda (R$)
  </Typography> 
<TextField
  placeholder="R$ 0,00"
  inputMode="numeric"
  {...register("preco_venda")}
  onChange={(e) => {
    e.target.value = maskCurrency(e.target.value);
  }}
  sx={textFieldStyle}
/>

  </Box>
</Box>

<Box display={"flex"} flexDirection={"column"} flex={1}>

<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Descrição
  </Typography>
    <TextField 
      placeholder="Descrição do produto"
      {...register("descricao", { required: "Campo obrigatório" })}
      error={!!errors.descricao}
      helperText={errors.descricao?.message}
      sx={textFieldStyle}
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
      ) : product ? (
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
