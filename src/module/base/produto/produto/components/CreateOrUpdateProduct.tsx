import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { maskCurrency, parseCurrencyBR } from "../../../../../shared/MaskUtils";
import { statusAtivoOptions, unidadeMock, type IUnidade } from "../../../../../shared/Mocks";
import { bgColorCardsDashBoard, colorOpacity, textFieldStyle } from "../../../../../theme/theme";
import type { ProductDTO } from "../dto/ProdutoDTO";
import type { CategoryProduct, FornecedorProduct, MarkProduct, ProductEntity } from "../entity/ProductEntity";
import { getUnidadeDescricao } from "../helprs/Helpers";
import { createProduct, fetchProductByGtin, updateProduct } from "../repository/ProductRepository";



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
  setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductDTO>();
const gtin = useWatch({ control, name: "eanCode" });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [loadingGtin, setLoadingGtin] = useState(false);
  const [un, setUnidade] = useState<IUnidade | null>(null);
  const eanInputRef = useRef<HTMLInputElement | null>(null);

useEffect(() => {
  if (product) {
      const unidadeSelecionada = unidadeMock.find((u) => u.nome === product.un);
    reset({
      eanCode: product.eanCode ?? null,
       ativo: product.ativo,
      nome: product.nome ?? null,
      categoria_id: product.categoria_id ?? '',
      marca_id: product.marca_id ?? '',
      un: unidadeSelecionada?.id ??"",
      preco_custo: product.preco_custo ?? 0,
      preco_venda: product.preco_venda ?? 0,
      estoque_minimo: product.estoque_minimo ?? 0,
      descricao: product.descricao ??null,
      fornecedor_id: product.fornecedor_id ??'',
    
    });
    setUnidade(unidadeSelecionada ?? null);
  } else {
 reset({
      eanCode:  null,
      ativo: true,
      nome:  null,
      categoria_id:  '',
      marca_id: '',
      un:  unidadeMock[0]?.nome ?? "",
      preco_custo:  0,
      preco_venda:  0,
      estoque_minimo:  0,
      descricao: null,
      fornecedor_id:  '',
    
    });
  }
}, [product, reset]);



const handleFetchProductByGtin = async () => {
   if (!gtin) return;
  if (!/^\d{8,14}$/.test(gtin.trim())) return;

  try {
    setLoadingGtin(true);
    const result = await fetchProductByGtin(gtin.trim());
    if(!result.success) {
        setToastType("error");
        setToastMsg(result.message ?? "Gtin inválido.");
        setToastOpen(true);
        return;
    }
    const data = result.data;
    setValue("nome", data.nome ?? '');
  } catch (error) {
        setToastType("error");
        setToastMsg("Erro ao buscar produto pelo GTIN.");
        setToastOpen(true);
  } finally {
      setLoadingGtin(false);
    }
}

  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: ProductDTO) => {
  let result;
  const unidadeDescricao = getUnidadeDescricao(data.un!);
  if (product === null) {
    //  CREATE
    const payload  = {
      nome: data.nome?.trim(),
      descricao: data.descricao?.trim(),
      ativo: data.ativo,
      un: unidadeDescricao?? "",
      eanCode: data.eanCode?.trim(),
      marca_id:data.marca_id !== null  && data.marca_id !== "" ? Number(data.marca_id) : null,
      fornecedor_id:data.fornecedor_id !== null  && data.fornecedor_id !== "" ? Number(data.fornecedor_id) : null,
      categoria_id:data.categoria_id !== null  && data.categoria_id !== "" ? Number(data.categoria_id) : null,
      preco_custo: parseCurrencyBR(data.preco_custo as unknown as string),
      preco_venda: parseCurrencyBR(data.preco_venda as unknown as string),
      estoque_minimo: Number(data.estoque_minimo),
    };
    result = await createProduct(payload);
  } else {
    // UPDATE
    const payload: ProductEntity = {
      id: product.id, // vem da entidade selecionada
      nome: data.nome?.trim(),
      data_cadastro: product.data_cadastro,
      descricao: data.descricao?.trim(),
      ativo: data.ativo,
      un:unidadeDescricao ?? product.un,
      eanCode: data.eanCode?.trim(),
      marca_id: Number(data.marca_id),
      fornecedor_id: Number(data.fornecedor_id),
      categoria_id: Number(data.categoria_id),
      preco_custo:typeof data.preco_custo === "string" ? parseCurrencyBR(data.preco_custo as unknown as string) : data.preco_custo,
      preco_venda:typeof data.preco_venda === "string" ? parseCurrencyBR(data.preco_venda as unknown as string) : data.preco_venda,
      estoque_minimo: Number(data.estoque_minimo),
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
    width: { xs: "95vw", sm: "90vw", md: 620 },
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: bgColorCardsDashBoard,
    borderRadius: 2,
    border: "1px solid rgba(40, 61, 107, 0.4)",
    p: 4,
  }}
>
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

  <Typography fontSize="1.4rem" fontWeight={700} color="#fff" mb={0}>
    {product ? "Editar Produto" : "Novo Produto"}
  </Typography>
      {loadingGtin && (
      <Stack
      height={200}
      alignItems="center"
      justifyContent="center"
      >
      <CircularProgress color="inherit" />
      <Typography mt={2} color={colorOpacity}>
      Carregando produtos...
      </Typography>
      </Stack>
      )}
  {!loadingGtin && (   <form onSubmit={handleSubmit(onSubmit)}>
<Stack gap={2} display={"flex"} flexDirection={"row"} flexGrow={1}>
  <Box display={"flex"} flexDirection={"column"} flex={1}>
      {/* Nome */}
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Código EAN
  </Typography>
    <TextField 
      placeholder="Código de barras (leitor ou manual)"
      {...register("eanCode", { required: "Campo obrigatório" })}
      inputRef={eanInputRef}
      error={!!errors.eanCode}
      onBlur={handleFetchProductByGtin}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleFetchProductByGtin();
        }
      }}
      helperText={errors.eanCode?.message}
      sx={textFieldStyle}
    />
  </Box>

<Box display={"flex"} flexDirection={"column"} flex={1}>
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    Ativo
  </Typography>

 <Controller
  name="ativo"
  control={control}
  render={({ field }) => (
    <TextField
      select
      sx={textFieldStyle}
      value={String(field.value)} // "true" | "false"
      onChange={(e) => field.onChange(e.target.value === "true")}
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
    >
      {statusAtivoOptions.map((item) => (
        <MenuItem
          key={item.key}
          value={String(item.ativo)} // string
        >
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  )}
/>

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
<Controller
  name="un"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <TextField
      {...field}
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
      onChange={(e) => {
        const id = Number(e.target.value);
        field.onChange(id);

        const unidadeSelecionada = unidadeMock.find(
          (u) => u.id === id
        );
        setUnidade(unidadeSelecionada ?? null);
      }}
    >
      {unidadeMock.map((u) => (
        <MenuItem key={u.id} value={u.id}>
          {u.nome}
        </MenuItem>
      ))}
    </TextField>
  )}
/>
  </Box>
</Stack>
<Box
  display="grid"
  gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
  gap={2}
>
<Box display={"flex"} flexDirection={"column"} flex={1}>
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    Estoque
  </Typography>

  <TextField
    type="text"
    placeholder="0"
    disabled={!un}
    sx={textFieldStyle}
    error={!!errors.estoque_minimo}
    helperText={
      !un
        ? "Selecione uma unidade primeiro"
        : errors.estoque_minimo?.message
    }
    {...register("estoque_minimo", {
      required: "Campo obrigatório",
      onChange: (e) => {
        if (!un) return;

        let value = e.target.value;

        if (!un.fracionado) {
          // Remove qualquer separador decimal
          value = value.replace(/[.,]/g, "");
        } else {
          // Mantém apenas números e ponto
          value = value.replace(/[^0-9.]/g, "");

          // Garante apenas um ponto
          const parts = value.split(".");
          if (parts.length > 2) {
            value = `${parts[0]}.${parts.slice(1).join("")}`;
          }

          // Limita a duas casas decimais
          if (parts[1]?.length > 2) {
            value = `${parts[0]}.${parts[1].slice(0, 2)}`;
          }
        }

        e.target.value = value;
      },
    })}
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
  </form>)}
</Box>
</Modal>
);
}
