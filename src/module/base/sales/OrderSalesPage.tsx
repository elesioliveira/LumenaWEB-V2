
  import {  ChevronLeft, ChevronRight, Eye, FileInput, LogIn, LogOut, Plus, ShoppingCart, Trash2 } from "lucide-react";
  import {
  Box,
  Typography,
  Stack,
  TextField,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  } from "@mui/material";
  import { useEffect, useRef, useState } from "react";
import { bgColorCardsDashBoard, bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor, textFieldStyle } from "../../../theme/theme";
import { cellStyle, cellStyleBold } from "../../../theme/cellTable";
import { formatDateTime, maskCurrency } from "../../../shared/MaskUtils";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";
import type { SalesEntity } from "./entity/SalesEntity";
import { salesMock, typeOfStatusList } from "./mocks/SalesMocks";
import { typeofStatus, typeofStatusBg } from "./helpers/SalesHelpers";




export function OrderSalePage() {
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
const [typeOfSale, setTypeofSale] = useState<string>("Todos");

const totalPages = Math.ceil(sales.length / rowsPerPage);
const salesPaginados = sales.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);


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
  getStockEntrada("",typeOfSale.replaceAll("TODOS",""));
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
    <Stack display={"flex"} flexDirection={"row"} flexGrow={2} justifyContent={"space-between"} >
    <Box display={"flex"} flexDirection={"column"}>
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
    Pedidos de Venda
    </Typography>
    <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
    Gerencie todos os pedidos realizados
    </Typography>
    </Box>
    </Stack>
    <Stack display={"flex"} flexDirection={"row"} flexGrow={1} justifyContent={"space-between"} mt={8} mb={3} mr={2} justifyItems={"start"}  alignItems={"start"} alignContent={"start"}>
    <Stack display={"flex"} flexDirection={"row"}  gap={1}  mb={1} >
    <ShoppingCart size={30} color="#ffff" />
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#FFFF"}}>
    Lista de Pedidos
    </Typography>
    </Stack>
    <Stack display={"flex"} flexDirection={"row"} gap={1.2}>
<TextField
  select
sx={{
  ...textFieldStyle,
  width: 200,

  "& .MuiOutlinedInput-input": {
    padding: "6px 10px",
    fontSize: 14,
  },
}}
  value={typeOfSale}
  onChange={(e) => setTypeofSale(e.target.value)}
  SelectProps={{
    MenuProps: {
      PaperProps: {
        sx: {
          bgcolor: bgColorCardsDashBoard,
          borderRadius: 1,
          color: "#fff",
        },
      },
    },
  }}
>
  {typeOfStatusList.map((status) => (
    <MenuItem key={status} value={status}>
      {status}
    </MenuItem>
  ))}
</TextField>

    <TextField
    placeholder="Buscar por pedido ou cliente..."
  onChange={(e) => {
      searchRef.current = e.target.value;
      debounceSearch();
      }}
    size="small"
    sx={{
    width: 270,

    // INPUT ROOT
    "& .MuiOutlinedInput-root": {
    backgroundColor: bgColorTopSellers, // fundo
    color: "#fff",

    // BORDA PADRÃO
    "& fieldset": {
    borderColor: colorOpacity,
    },

    // HOVER
    "&:hover fieldset": {
    borderColor: primaryColor,
    },

    // FOCUS
    "&.Mui-focused fieldset": {
    borderColor: primaryColor,
    borderWidth: 2,
    },
    },

    // TEXTO DO INPUT
    "& input": {
    color: "#fff",
    fontSize: "0.9rem",
    },

    // PLACEHOLDER
    "& input::placeholder": {
    color: colorOpacity,
    opacity: 1,
    },
    }} />
    <PrimaryActionButton
    label="Novo Pedido"
    boxShadow="0 0 20px rgba(245,159,10,0.35)"
    background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
    startIcon={<Plus />}
    onClick={async() => {
    //corrigir aqui
    }}
  />
    </Stack>
    </Stack>
    {/* Tabela */}
    <Box mr={2} flexGrow={1}>
    {/* LOADING */}
    {loading && (
    <Stack
    height={200}
    alignItems="center"
    justifyContent="center"
    >
    <CircularProgress color="inherit" />
    <Typography mt={2} color={colorOpacity}>
    Carregando movimentações...
    </Typography>
    </Stack>
    )}

    {/* LISTA VAZIA */}
    {!loading && sales.length === 0 && (
    <Stack
    height={200}
    alignItems="center"
    justifyContent="center"
    >
    <Typography color={colorOpacity}>
    Nenhuma movimentação encontrada.
    </Typography>
    </Stack>
    )}

    {/* TABELA */}
    {!loading && sales.length > 0 && (
    <TableContainer
    sx={{
    maxHeight: "100%",
    mr: 5,
    mt: 2,
    }}
    >
    <Table
    stickyHeader
    sx={{
    bgcolor: "transparent",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
    }}
    >
    {/* HEADER */}
    <TableHead>
    <TableRow>
    {["Nº Pedido", "Cliente", "Canal", "Data", "Itens","Total","Status","Ações"].map(
    (col) => (
    <TableCell
    key={col}
    sx={{
    backgroundColor: "transparent",
    color: colorOpacity,
    fontSize: "0.9rem",
    fontWeight: 600,
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
    {salesPaginados.map((row, index) => (
    <TableRow
    key={`${row.nPedido}/${index}`}
    sx={{
      alignContent:"center",
      justifyContent:"center",
      alignItems:"center",
      justifyItems:"center",
      backgroundColor: "rgba(255,255,255,0.02)",
    transition: "all 0.25s ease",
    ...hoverGlow,
    }}
    >
    <TableCell sx={cellStyle}>{row.nPedido}</TableCell>
    <TableCell sx={cellStyleBold}>{row.client}</TableCell>
    <TableCell sx={cellStyle}>{row.canal}</TableCell>
    <TableCell sx={cellStyle}>{formatDateTime(row.date)}</TableCell>
    <TableCell sx={cellStyleBold}>{row.itens}</TableCell>
    <TableCell sx={cellStyleBold}>{maskCurrency(row.total)}</TableCell>
    <Box
    sx={{
    width: 80,
    height: 22,
    borderRadius: 10,
    ml:2,
    gap:0.5,
    mt:2.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignContent:"center",
    justifyItems:"center",
    fontSize: "0.7rem",
    fontWeight: 600,
    color: typeofStatus(row.status),
    bgcolor:typeofStatusBg(row.status),
    }}
    >
    {row.status}
    </Box>
    <TableCell sx={cellStyle}> <Stack direction="row" spacing={1} justifyContent="start" alignItems="start" > 
     {/* Visualizar */} 
    <Box
    onClick={() => fetchMoviment(row)}
    sx={{
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
    cursor: "pointer",
    color: colorOpacity,
    transition: "0.25s ease",
    "&:hover": {
    color: colorPositive,
    backgroundColor: "rgba(0,200,83,0.15)",
    boxShadow:"0 0 12px rgba(0,200,83,0.45)",
    transform: "translateY(-1px)",
    },
    }}>
    <Eye size={18} />
    </Box>   
    {/* Deletar */} 
    <Box onClick={() => handleSelectMovDelete(row)} sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, cursor: "pointer", color: colorOpacity, transition: "0.25s ease", 
      "&:hover": { color: colorNegative, backgroundColor: bgColorNegative, boxShadow: "0 0 12px rgba(255,50,50,0.45)", transform: "translateY(-1px)", }, }} >
    <Trash2 size={16} /> </Box> 

    </Stack> 
    </TableCell>
    </TableRow>
    ))}
    </TableBody>
    </Table>
    </TableContainer>
    )}
    {!loading && sales.length > rowsPerPage && (
    <Box
    mt={3}
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={2}
    mb={2}
    >
    {/* LEFT */}
    <PaginationButton
    disabled={page === 0}
    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
    >
    <ChevronLeft size={20} />
    </PaginationButton>

    {/* PAGE NUMBER */}
    <Box
    sx={{
    minWidth: 48,
    height: 36,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "0.9rem",
    color: "#fff",
    background: bgComponents,
    }}
    >
    {page + 1}
    </Box>

    {/* RIGHT */}
    <PaginationButton
    disabled={page >= totalPages - 1}
    onClick={() =>
    setPage((prev) => Math.min(prev + 1, totalPages - 1))
    }
    >
    <ChevronRight size={20} />
    </PaginationButton>
    </Box>
    )}
    </Box>
    </Box>
    </Box>
    </>
    );
    }