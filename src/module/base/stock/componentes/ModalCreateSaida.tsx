
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
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
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { FornecedorProduct } from "../../produto/produto/entity/ProductEntity";
import type { EstoqueItem, MovimentarEstoqueDTO } from "../dto/StockDTO";
import { fetchProductByGtinOrName, submitMovimentarEstoque } from "../repository/StockRepository";
import { bgColorCardsDashBoard, bordasComponents, colorNegative, colorOpacity, hoverGlow, primaryColor, textFieldStyle } from "../../../../theme/theme";
import { maskCurrency } from "../../../../shared/MaskUtils";
import { FileUp, Package, Trash2 } from "lucide-react";
import { cellStyle, cellStyleBold } from "../../../../theme/cellTable";
import { PrimaryActionButton } from "../../../../shared/PrimaryActionButtonProps";
import type { StockProduct } from "../entity/StockEntity";
import { parseNFeXml } from "../utils/parseNFeXml";
import { createProduct } from "../../produto/produto/repository/ProductRepository";


interface SaidaEstoqueModal {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  fornecedores: FornecedorProduct [];
}



const motivos = [
    {key:1, label: "Venda"},
    {key:2, label: "Devolução ao Vendedor"},
    {key:3, label: "Avarias/Perda"},
    {key:4, label: "Consumo interno"},
    {key:5, label: "Outros"},
];

export function ModalSaidaStock({
  open,
  onClose,
  onSuccess,
  fornecedores
}: SaidaEstoqueModal) {
  const {
    register,
    handleSubmit,
    reset,    
  control,
  setValue,
    formState: { errors, isSubmitting },
  } = useForm<MovimentarEstoqueDTO>();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [submitLoading, setLoading] = useState(false);
  const [itens, setItens] = useState<EstoqueItem[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<StockProduct | null>(null);
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [produtos, setProdutos] = useState<StockProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [search, setSearch] = useState("");
  const [importingXml, setImportingXml] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

const calcularValorTotal = () =>
  itens.reduce((total, item) => total + (item.sub_total ?? 0), 0);

  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: MovimentarEstoqueDTO) => {
  if (itens.length === 0) {
    setToastType("error");
    setToastMsg("Adicione ao menos um item à movimentação.");
    setToastOpen(true);
    return;
  }

  const itensInvalidos = itens.filter((i) => !i.produto_id);
  if (itensInvalidos.length > 0) {
    setToastType("error");
    setToastMsg("Existem itens não cadastrados. Remova-os antes de salvar.");
    setToastOpen(true);
    return;
  }

  setLoading(true);

  try {
    const payload: MovimentarEstoqueDTO = {
      ...data,
      tipo: "SAIDA",
      valor_total: calcularValorTotal(),
      itens: itens.map(item => ({
        produto_id: item.produto_id!,
        quantidade: item.quantidade!,
        valor_unitario: item.valor_unitario!,
        sub_total: item.sub_total!,
      })),
    };

    const result = await submitMovimentarEstoque(payload);

    if (!result?.success) {
      setToastType("error");
      setToastMsg(result?.message ?? "Erro ao criar movimentação.");
      setToastOpen(true);
      return;
    }

    reset();
    setItens([]);
    setProdutoSelecionado(null);
    setQuantidade("");
    setSearch("");

    await onSuccess();
    onClose();
  } catch {
    setToastType("error");
    setToastMsg("Erro ao criar movimentação.");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};


const onDeleteItem = (index: number) => {
  setItens((prev) => prev.filter((_, i) => i !== index));
};

const fetchProducts = async (value: string) => {
  if (!value || value.trim().length < 2) {
    setProdutos([]);
    return;
  }

  setLoadingProducts(true);

  const result = await fetchProductByGtinOrName(value);

  if (!result?.success) {
    setProdutos([]);
    setLoadingProducts(false);
    return;
  }

  const data: StockProduct[] = result.data;

  // 👉 se veio apenas 1 produto (GTIN)
  if (data.length === 1) {
    setProdutoSelecionado(data[0]);
    setProdutos(data); // opcional
  } else {
    setProdutos(data);
  }

  setLoadingProducts(false);
};

const handleImportXml = async (file: File) => {
  setImportingXml(true);
  try {
    const xmlString = await file.text();
    const nfeData = parseNFeXml(xmlString);

    setValue("nota", nfeData.numero);
    if (nfeData.dataEmissao) {
      setValue("data_emissao", dayjs(nfeData.dataEmissao));
    }

    const fornecedorMatch = fornecedores.find(
      (f) =>
        f.nome.toLowerCase().includes(nfeData.fornecedor.nome.toLowerCase()) ||
        nfeData.fornecedor.nome.toLowerCase().includes(f.nome.toLowerCase())
    );
    if (fornecedorMatch) {
      setValue("fornecedor_id", fornecedorMatch.id);
    }

    const importedItens: EstoqueItem[] = [];
    let produtosCriados = 0;

    for (const item of nfeData.itens) {
      const searchKey = item.ean || item.nome;
      const result = await fetchProductByGtinOrName(searchKey);

      if (result?.success && result.data?.length > 0) {
        const produto: StockProduct = result.data[0];
        importedItens.push({
          produto_id: produto.id,
          nome: produto.nome,
          quantidade: item.quantidade,
          valor_unitario: item.valorUnitario,
          sub_total: item.subtotal,
        });
      } else {
        const newProduct = await createProduct({
          nome: item.nome,
          eanCode: item.ean || null,
          un: item.unidade || "UN",
          ativo: true,
          preco_custo: item.valorUnitario,
          preco_venda: 0,
          estoque_minimo: 0,
          marca_id: 0,
          fornecedor_id: fornecedorMatch?.id ?? 0,
          categoria_id: 0,
          descricao: null,
        });

        if (newProduct?.success && newProduct.data?.id) {
          produtosCriados++;
          importedItens.push({
            produto_id: newProduct.data.id,
            nome: item.nome,
            quantidade: item.quantidade,
            valor_unitario: item.valorUnitario,
            sub_total: item.subtotal,
          });
        } else {
          importedItens.push({
            produto_id: null,
            nome: `[NÃO CADASTRADO] ${item.nome}`,
            quantidade: item.quantidade,
            valor_unitario: item.valorUnitario,
            sub_total: item.subtotal,
          });
        }
      }
    }

    setItens(importedItens);

    if (produtosCriados > 0) {
      setToastType("success");
      setToastMsg(`XML importado! ${produtosCriados} produto(s) criado(s) automaticamente.`);
      setToastOpen(true);
    } else {
      setToastType("success");
      setToastMsg(`XML importado com ${importedItens.length} item(ns).`);
      setToastOpen(true);
    }
  } catch (error) {
    setToastType("error");
    setToastMsg(error instanceof Error ? error.message : "Erro ao processar o XML.");
    setToastOpen(true);
  } finally {
    setImportingXml(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
};

useEffect(() => {
  const timer = setTimeout(() => {
    fetchProducts(search);
  }, 400);

  return () => clearTimeout(timer);
}, [search]);

return (
      <>
{/* TOAST */}
<Snackbar
    open={toastOpen}
    autoHideDuration={2000}
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
    width: { xs: "95vw", sm: "90vw", md: 820 },
    maxHeight: "90vh",
    bgcolor: bgColorCardsDashBoard,
    borderRadius: 2,
    border: "1px solid rgba(40, 61, 107, 0.4)",
    p: 4,
    overflowY:"auto",
    }}>
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Box>
      <Typography fontSize="1.4rem" fontWeight={600} color="#fff" mb={0}>
        Nova Nota de Saída
      </Typography>
      <Typography fontSize="1rem" fontWeight={400} color={colorOpacity} mb={0}>
        Preencha os dados da saída de estoque
      </Typography>
    </Box>
    <Button
      variant="outlined"
      startIcon={<FileUp size={18} />}
      onClick={() => fileInputRef.current?.click()}
      disabled={importingXml}
      sx={{
        color: primaryColor,
        borderColor: primaryColor,
        textTransform: "none",
        fontWeight: 600,
        "&:hover": {
          borderColor: primaryColor,
          backgroundColor: "rgba(245,159,10,0.08)",
        },
      }}
    >
      {importingXml ? "Processando..." : "Importar XML"}
    </Button>
    <input
      ref={fileInputRef}
      type="file"
      accept=".xml"
      hidden
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleImportXml(file);
      }}
    />
  </Stack>
{(submitLoading || importingXml) && (
<Stack
height={200}
alignItems="center"
justifyContent="center"
>
<CircularProgress color="inherit" />
<Typography mt={2} color={colorOpacity}>
Carregando ...
</Typography>
</Stack>
)}
  {!submitLoading && !importingXml && (<form onSubmit={handleSubmit(onSubmit)}>
<Box 
display="grid"
gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }}
gap={2} >
<Box display={"flex"} flexDirection={"column"} flex={1}>
<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Número da Nota*
  </Typography>
    <TextField 
      placeholder="Ex: NF-001134"
      {...register("nota", { required: "Campo obrigatório" })}
      error={!!errors.nota}
      helperText={errors.nota?.message}
      sx={textFieldStyle}
    />
</Box>
<Box display={"flex"} flexDirection={"column"} flex={1}>  
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
  Motivo da Saída*
  </Typography>
<Controller
  name="motivo_saida"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Autocomplete
      options={motivos}
      getOptionLabel={(option) => option.label}
      value={
        motivos.find((m) => m.label === field.value)  || null
      }
      onChange={(_, newValue) => {
        field.onChange(newValue ? newValue.label : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Selecione o motivo"
          sx={textFieldStyle}
          error={!!errors.motivo_saida}
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
  Cliente*
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
          placeholder="Selecione o cliente"
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
<Box display={"flex"} flexDirection={"column"} flex={1}  >
  <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
    Data de Saída*
  </Typography>
  <Controller
    name="data_emissao"
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
  format="DD/MM/YYYY"
  label="dd/mm/aaaa"
  value={field.value ? dayjs(field.value) : null}
  onChange={(date) => {
    field.onChange(date); // mantém Dayjs aqui
  }}
slotProps={{
    textField: {
      variant: "outlined", // equivalente ao filled: true do Flutter
sx: {
  backgroundColor: "#182543",
  borderRadius: 1,
  border: "1px solid rgba(40, 61, 107, 0.4)",

  "& .MuiOutlinedInput-root": {
    backgroundColor: "#182543",
  },
  "& .MuiIconButton-root:hover": {
    color: primaryColor,
  },
  "& .input": {
color:"#FFFF"
  },
  /* TEXTO DA DATA (readOnly) */
  "& .MuiOutlinedInput-input.Mui-readOnly": {
    color: "#fff",
    WebkitTextFillColor: "#fff",
    fontSize: 16,
    fontWeight: 500,
  },

  /* PLACEHOLDER */
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#fff",
    opacity: 1,
  },

  /* LABEL */
  "& label": {
    color: "#fff",
  },
},
      InputProps: {
        disableUnderline: false, // remove underline padrão do filled
      },
      error: !!errors.data_emissao,
       helperText:
        typeof errors.data_emissao?.message === "string"
          ? errors.data_emissao.message
          : undefined,
    },
    popper: {
      sx: {
        "& .MuiPaper-root": {
          backgroundColor: bgColorCardsDashBoard,
          color: "#fff",
          border: bordasComponents,
        },
        "& .MuiPickersDay-root": {
          color: "#fff",
        },
        "& .MuiPickersDay-root.Mui-selected": {
          backgroundColor: primaryColor,
          color: "#FFFF",
          fontWeight: 900,
        },
          "& label": {
          color: "#fff",
        },
      },
    },
  }}
/>
</LocalizationProvider>)}
/>
</Box>
</Box>
<Box display={"flex"} flexDirection={"column"}>
{/* Descricao */}
<Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1} mt={3}>
Observação
</Typography>
<TextField
fullWidth
multiline
rows={2} //  controla a altura
placeholder="Observações adicionais..."
{...register("observacao")}
sx={textFieldStyle}
/>
</Box>

<Stack display={"flex"} flexDirection={"row"} flexGrow={1} gap={1} mt={4}>
<Package size={28} color="#FFF"/>
<Typography fontSize="1.2rem" fontWeight={"bold"} color="#fff" mb={1} >
Itens da Nota
</Typography>
</Stack>
<Box
  display="grid"
  gridTemplateColumns="2fr 1fr 1fr auto"
  gap={2}
  mt={2}
>
  {/* PRODUTO */}
<Autocomplete
  options={produtos}
  loading={loadingProducts}
  value={produtoSelecionado}
  inputValue={search}
  onInputChange={(_, value) => {
    setSearch(value);
  }}
  onChange={(_, value) => {
    setProdutoSelecionado(value);
    setQuantidade("");
  }}
  getOptionLabel={(option) => option?.nome ?? ""}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Produto"
      sx={textFieldStyle}
    />
  )}
  PaperComponent={(props) => (
    <Box
      {...props}
      sx={{
        bgcolor: bgColorCardsDashBoard,
        border: bordasComponents,
        color: "#fff",
      }}
    />
  )}
/>


  {/* QUANTIDADE */}
  <TextField
    placeholder="Qtd"
    type="number"
    value={quantidade}
    onChange={(e) => {
      const value = e.target.value;
      if (!produtoSelecionado) return;

      // se não permite fracionado, força inteiro
      if (!produtoSelecionado.fracionado && value.includes(".")) return;

      setQuantidade(value === "" ? "" : Number(value));
    }}
    inputProps={{
      step: produtoSelecionado?.fracionado ? "0.01" : "1",
      min: 0,
    }}
    sx={textFieldStyle}
    disabled={!produtoSelecionado}
  />

  {/* VALOR UNITÁRIO (READ ONLY) */}
  <TextField
    value={
      produtoSelecionado
        ? maskCurrency(produtoSelecionado.valor_custo)
        : ""
    }
    placeholder="Valor unit."
    sx={textFieldStyle}
    disabled
  />

  {/* BOTÃO ADICIONAR */}
  <PrimaryActionButton
    label="Adicionar"
    height={53}
    boxShadow="0 0 20px rgba(245,159,10,0.35)"
    background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
    sx={{mt:0.4}}
    disabled={!produtoSelecionado || !quantidade || quantidade <= 0}
    onClick={() => {
      if (!produtoSelecionado || !quantidade) return;
       const jaExiste = itens.some(
        (item) => item.produto_id === produtoSelecionado.id
    );

  if (jaExiste) {
    setToastType("error");
    setToastMsg("Produto já adicionado a lista");
    setToastOpen(true);  
    return;
}

      const subTotal =
        quantidade * produtoSelecionado.valor_custo;

      setItens((prev) => [
        ...prev,
        {
          produto_id: produtoSelecionado.id,
          nome: produtoSelecionado.nome,
          quantidade,
          valor_unitario: produtoSelecionado.valor_custo,
          sub_total: subTotal,
        },
      ]);

      // reset
      setProdutoSelecionado(null);
      setQuantidade("");
    }}
  />
</Box>

 {itens.length >0}     
  <TableContainer sx={{ maxHeight: "100%",  mt:0, overflowX: "auto" }}>
      <Table
        stickyHeader//se tirar some o header da table
        aria-label="Pedidos Recentes"
        sx={{
          mt: 2,
          bgcolor: "transparent",
          borderCollapse: "separate",
          borderSpacing: "0 8px", // espaço entre linhas (opcional)
        }}
      >
        {/* HEADER */}
        <TableHead>
          <TableRow>
            {["Produto", "Qtd", "Valor Unit.", "Subtotal", ""].map(
              (col) => (
                <TableCell
                  key={col}
                  sx={{
                    backgroundColor: "transparent", //  remove fundo
                    color: colorOpacity,
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid rgba(40, 61, 107, 0.4)",
                  }}
                >
                  {col}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {itens.map((row,index) => (
            <TableRow
                key={`${row.produto_id}-${index}`}
              sx={{
                backgroundColor: "rgba(255,255,255,0.02)",
                transition: "0.25s ease",

                "&:hover": {
                    transition: "all 0.25s ease",
        ...hoverGlow,
                },
              }}
            >
              <TableCell sx={cellStyleBold}>{row.nome}</TableCell>
              <TableCell sx={cellStyle}>{row.quantidade}</TableCell>
              <TableCell sx={cellStyleBold}>{maskCurrency(row.valor_unitario!)}</TableCell>
              <TableCell sx={cellStyleBold}>{maskCurrency(row.sub_total!)}</TableCell>
            <TableCell sx={cellStyle}>
            <Stack direction="row" spacing={1}>
            <Box
            onClick={() => onDeleteItem(index)}
            sx={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              cursor: "pointer",
              color: colorNegative,
              transition: "0.25s ease",
              "&:hover": {
                backgroundColor: "rgba(255,50,50,0.15)",
                boxShadow: "0 0 12px rgba(255,50,50,0.45)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Trash2 />
          </Box>
        </Stack>
      </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     {/* AÇÕES */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: colorOpacity,
                border: "1px solid rgba(40, 61, 107, 0.6)",
                width:150
              }}
            >
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
            ) : "Salvar"}
            </Button>
          </Stack>
  </form>)}
</Box>
</Modal>
</>
);
}
