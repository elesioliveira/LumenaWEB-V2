  import {  Package, Save, ShoppingCart, Trash2} from "lucide-react";
  import {
  Box,
  Typography,
  Stack,
  TextField,
  Snackbar,
  Alert,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  } from "@mui/material";
  import { useEffect, useRef, useState } from "react";
import { bgColorCardsDashBoard, bordasComponents,colorNegative,colorOpacity, hoverGlow, primaryColor, textFieldStyle } from "../../../theme/theme";
import type { SalesEntity } from "./entity/SalesEntity";
import { salesMock, typeOfStatusList, typeOfStatusListNewSales } from "./mocks/SalesMocks";
import type { StockProduct } from "../stock/entity/StockEntity";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { cellStyle, cellStyleBold } from "../../../theme/cellTable";
import { maskCurrency } from "../../../shared/MaskUtils";
import type { EstoqueItem } from "../stock/dto/StockDTO";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";




export function NewSalePage() {
const [openSaleModal, setOpenDetailsModal] = useState(false);
const [openModalDelete, setOpenModalDelete] = useState(false);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const rowsPerPage = 10;
const [sales, setSales] = useState<SalesEntity[]>([]);
const [typeOfSale, setTypeofSale] = useState<string | null>("Pendente");
const [produtos, setProdutos] = useState<StockProduct[]>([]);
const [loadingProducts, setLoadingProducts] = useState(false);
const [produtoSelecionado, setProdutoSelecionado] = useState<StockProduct | null>(null);
const [quantidade, setQuantidade] = useState<number | "">("");
const [search, setSearch] = useState("");
const [dataPedido, setDatePedido] = React.useState<Dayjs | null>(null);
const [itens, setItens] = useState<EstoqueItem[]>([]);
const totalPages = Math.ceil(sales.length / rowsPerPage);
const salesPaginados = sales.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);

const onDeleteItem = (index: number) => {
  setItens((prev) => prev.filter((_, i) => i !== index));
};

const debounceSearch = () => {
if (debounceTimeout.current) {
clearTimeout(debounceTimeout.current);
}

debounceTimeout.current = setTimeout(() => {
const value = searchRef.current.trim();

if ( value !=='' && value.length < 0) return;

  getStockEntrada(value);
}, 500);
};



const fetchMoviment = async (row: any) => {
    //corrigir aqui
  setLoading(true);
  try {
    // const result = await fetchStockDetails(row.movimentacao_id);
    //  if (!result?.success) {
    // setToastType("error");
    // setToastMsg(result?.message ?? "Erro ao mudar status do produto.");
    // setToastOpen(true);
    // return;
    // }
    // setMovimentDetails(result.data);
    // setOpenDetailsModal(true);
  } catch (error) {
    // setToastType("error");
    // setToastMsg("Erro ao mudar status do status do produto.");
    // setToastOpen(true);
    // return;
  }finally {
    setLoading(false);
  }
}

const handleSelectMovDelete = (row: any) =>{
 //corrigir aqui
    // setMovimentDelete(row.movimentacao_id);
  setOpenModalDelete(true);
};



const getStockEntrada = async (search?: string, tipo?: string) => {
  setLoading(true);
  setPage(0);
  //corrigir aaqui
  try {
    // const result = await fetchStock(search,tipo);

    // if (!result?.success) {
    //   setMovimentations([]);
    //   return;
    // }

    setSales(salesMock);
  } catch (error) {
    setSales([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
   if (jaCarregouRef.current) return;
    jaCarregouRef.current = true;
  getStockEntrada("",);
}, []);
 
useEffect(()=> {
  if (typeOfSale ==='') return;
  getStockEntrada("",typeOfSale?.replaceAll("TODOS",""));
},[typeOfSale]);

    return (
    <>
{/* corrigir aqui */}
  {/* <ModalDeleteMovById
      open={openModalDelete}
      movId={movimentDelete}
      onSuccess={async() => await getStockEntrada("")}
      onClose={() => {
      setOpenModalDelete(false);
      setMovimentDelete(null);
      }}
      />
  <ModalViewMovimentation
      open={openSaleModal}
      data={movimenDetails}
      onClose={() => {
      setOpenDetailsModal(false);
      setMovimentDetails(null);
      }}
      /> */}
    <Snackbar
    open={toastOpen}
    autoHideDuration={2500}
    onClose={() => setToastOpen(false)}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
    <Alert
    severity={toastType}
    onClose={() => setToastOpen(false)}
    sx={{ width: "100%" }}
    >
    {toastMsg}
    </Alert>
    </Snackbar>
    <Box flexDirection={"column"}>
   
    <Box display={"flex"} flexDirection={"column"} flexGrow={2} ml={2}>
    <Box display={"flex"} flexDirection={"column"}>
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
    Novo Pedido
    </Typography>
    <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
    Crie um novo pedido de venda
    </Typography>
    </Box>
    <Box display={"flex"} flexDirection={"row"} flexGrow={1} mt={4} gap={4} mr={2}>
      <Box display={"flex"} flex={3.2} flexDirection={"column"} gap={4}>
        <Box display={"flex"} flexDirection={"column"} p={4} width="100%" sx={{
           border: bordasComponents, borderRadius:1}}>
            <Stack display={"flex"} flexDirection={"row"} width="100%" justifyContent={"flex-start"} alignItems={"center"} gap={2}>
                <ShoppingCart color="#FFFF" size={34}/>
                <Typography color={"#FFFF"} fontSize="1.2rem" fontWeight="bold">
                    Dados do Pedido
                </Typography>
            </Stack>
            <Box display={"grid"}  gridTemplateColumns="repeat(2, 1fr)" gap={4} flexGrow={1} width={"100%"} mt={4}>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography color={"#FFFF"} fontWeight={400}>Cliente *</Typography>
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
              )}/>
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Typography color={"#FFFF"} fontWeight={400}>Data do Pedido *</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                format="DD/MM/YYYY"
                label="dd/mm/aaaa"
                value={dataPedido}
                onChange={(date) => setDatePedido(date)}
                slotProps={{
                    textField: {
                    variant: "outlined",
                    sx: {
                        backgroundColor: "#182543",
                        borderRadius: 1,
                        border: "1px solid rgba(40, 61, 107, 0.4)",

                        "& .MuiOutlinedInput-root": {
                        backgroundColor: "#182543",
                        },

                        "& .MuiOutlinedInput-input": {
                        color: "#fff",
                        WebkitTextFillColor: "#fff",
                        fontSize: 16,
                        fontWeight: 500,
                        },

                        "& .MuiOutlinedInput-input::placeholder": {
                        color: "#fff",
                        opacity: 1,
                        },
                        "& .MuiInputLabel-root": {
                        color: "#fff",
                        },
                      "& .MuiIconButton-root:hover": {
                        color: primaryColor,
                      },
                      "& .MuiIconButton-root": {
                        color: colorOpacity,
                      },
                    },
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
                        color: "#fff",
                        fontWeight: 900,
                        },
                    },
                    },
                }}
                />
               </LocalizationProvider>
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography color={"#FFFF"} fontWeight={400}>Canal de Venda *</Typography>
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
              )}/>
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography color={"#FFFF"} fontWeight={400}>Método de Entrega *</Typography>
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
              )}/>
            </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={1} mt={4}>
            <Typography color={"#FFFF"} fontWeight={400}>Observação *</Typography>
            <TextField
            multiline
            rows={4}               // altura inicial
            placeholder="Observações do pedido..."
            sx={textFieldStyle}
            />
            </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} p={4} width="100%" 
        sx={{border: bordasComponents, borderRadius:1}}>
            <Stack display={"flex"} flexDirection={"row"} width="100%" justifyContent={"flex-start"} alignItems={"center"} gap={2}>
                <Package color="#FFFF" size={34}/>
                <Typography color={"#FFFF"} fontSize="1.2rem" fontWeight="bold">
                    Produtos do Pedido
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
{itens.length > 0 ? (
  <TableContainer sx={{ maxHeight: "100%", mt: 0 }}>
    <Table
      stickyHeader
      aria-label="Pedidos Recentes"
      sx={{
        mt: 2,
        bgcolor: "transparent",
        borderCollapse: "separate",
        borderSpacing: "0 8px",
      }}
    >
      {/* HEADER */}
      <TableHead>
        <TableRow>
          {["Produto", "Qtd", "Valor Unit.", "Subtotal", ""].map((col) => (
            <TableCell
              key={col}
              sx={{
                backgroundColor: "transparent",
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
          ))}
        </TableRow>
      </TableHead>

      {/* BODY */}
      <TableBody>
        {itens.map((row, index) => (
          <TableRow
            key={`${row.produto_id}-${index}`}
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              transition: "0.25s ease",
              "&:hover": {
                ...hoverGlow,
              },
            }}
          >
            <TableCell sx={cellStyleBold}>{row.nome}</TableCell>
            <TableCell sx={cellStyle}>{row.quantidade}</TableCell>
            <TableCell sx={cellStyleBold}>
              {maskCurrency(row.valor_unitario!)}
            </TableCell>
            <TableCell sx={cellStyleBold}>
              {maskCurrency(row.sub_total!)}
            </TableCell>
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
) : (
  <Box
    sx={{
      mt: 3,
      height: 180,
      border: "2px dashed rgba(40, 61, 107, 0.6)",
      borderRadius: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: colorOpacity,
    }}
  >
    <Typography fontSize="1rem">
      Nenhum produto adicionado ao pedido
    </Typography>
  </Box>
)}

        </Box>
      </Box>
      <Box display={"flex"} flex={2} flexDirection={"column"}>
        <Box display={"flex"} flexDirection={"column"} p={4} width="100%" sx={{border: bordasComponents, borderRadius:1}}>
            <Typography color={"#FFFF"} fontSize="1.2rem" fontWeight="bold">
                Resumo do Pedido
            </Typography>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} mt={2}>
            <Typography color ={colorOpacity} fontSize="1rem" fontWeight={400}>
                Itens ({"0"})
            </Typography>
            <Typography color={"#FFFF"} fontSize="1rem" fontWeight={400}>
                {maskCurrency(25.350)}
            </Typography>
            </Stack>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} mt={1}>
            <Typography color ={colorOpacity} fontSize="1rem" fontWeight={400}>
                Frete
            </Typography>
            <Typography color={"#FFFF"} fontSize="1rem" fontWeight={400}>
                {maskCurrency(25.350)}
            </Typography>
            </Stack>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} mt={1}>
            <Typography color ={colorOpacity} fontSize="1rem" fontWeight={400}>
                Desconto Geral
            </Typography>
            <Typography color={"#FFFF"} fontSize="1rem" fontWeight={400}>
                {maskCurrency(25.350)}
            </Typography>
            </Stack>
            <Divider
            sx={{
                my: 2,
                borderWidth: 1.5,
                borderColor: "rgba(40, 61, 107, 0.8)",
            }}
            />
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} mt={2}>
            <Typography color={"#FFFF"} fontSize="1.4rem" fontWeight="bold">
                Total
            </Typography>
            <Typography color={primaryColor} fontSize="1.4rem" fontWeight="bold">
                {maskCurrency(0)}
            </Typography>
            </Stack>
            <Box display={"flex"} flexDirection={"column"} gap={1} mb={4}>
            <Typography color={"#FFFF"} fontWeight={400} mt={2}>Status</Typography>
            <Autocomplete
            options={typeOfStatusListNewSales}
            value={typeOfSale}
            onChange={(_, value) => {
                setTypeofSale(value!);
            }}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
                <TextField
                {...params}
                placeholder="Status do pedido..."
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
            </Box>
    <PrimaryActionButton
    label="Salvar"
    height={53}
    boxShadow="0 0 20px rgba(245,159,10,0.35)"
    startIcon={<Save />}
    background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
    sx={{mt:0.4}}
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
    <PrimaryActionButton
    label="Cancelar"
     height={53}
    background={"transparent"}
    sx={{mt:2}}
    boxShadow={"transparent"}
    onClick={() => {
    //   setTipoStock("SAIDA");
    }}
  />
        </Box>
      </Box>
    </Box>
    </Box>
    </Box>
    </>
    );
    }