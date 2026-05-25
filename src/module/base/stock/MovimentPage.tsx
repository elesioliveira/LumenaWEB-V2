
  import {  ChevronLeft, ChevronRight, Eye, FileInput, LogIn, LogOut, Trash2 } from "lucide-react";
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
  } from "@mui/material";
  import { useEffect, useRef, useState } from "react";
import { bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor } from "../../../theme/theme";
import { cellStyle, cellStyleBold } from "../../../theme/cellTable";
import { formatDateTime, maskCurrency } from "../../../shared/MaskUtils";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";
import { ModalViewMovimentation } from "./componentes/ModalViewMovimentation";
import type { MovimetDetails, StockEntradaEntity } from "./entity/StockEntity";
import { fetchStockDetails, fetchStock } from "./repository/StockRepository";
import { ModalDeleteMovById } from "./componentes/ModalDeleteMov";
import { useResponsive } from "../../../shared/useResponsive";




export function MovimentPage() {
const { isMobile } = useResponsive();
const [openModalView, setOpenModalView] = useState(false);
const [openModalDelete, setOpenModalDelete] = useState(false);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const [movimentations, setMovimentations] = useState<StockEntradaEntity[]>([]);
const [movimenDetails, setMovimentDetails] = useState<MovimetDetails| null>(null);
const [movimentDelete, setMovimentDelete] =useState<number |null>(null);
const [tipoMovimentStock, setTipoStock] = useState<string> ('');
const rowsPerPage = 10;

const totalPages = Math.ceil(movimentations.length / rowsPerPage);
const movimentationsPaginados = movimentations.slice(
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



const fetchMoviment = async (row: StockEntradaEntity) => {
  setLoading(true);
  try {
    const result = await fetchStockDetails(row.movimentacao_id);
     if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao mudar status do produto.");
    setToastOpen(true);
    return;
    }
    setMovimentDetails(result.data);
    setOpenModalView(true);
  } catch (error) {
    setToastType("error");
    setToastMsg("Erro ao mudar status do status do produto.");
    setToastOpen(true);
    return;
  }finally {
    setLoading(false);
  }
}

const handleSelectMovDelete = (row: StockEntradaEntity) =>{
  setMovimentDelete(row.movimentacao_id);
  setOpenModalDelete(true);
};



const getStockEntrada = async (search?: string, tipo?: string) => {
  setLoading(true);
  setPage(0);
  try {
    const result = await fetchStock(search,tipo);

    if (!result?.success) {
      setMovimentations([]);
      return;
    }

    setMovimentations(result.data ?? []);
  } catch (error) {
    setMovimentations([]);
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
  if (tipoMovimentStock ==='') return;
  getStockEntrada("",tipoMovimentStock.replaceAll("TODOS",""));
},[tipoMovimentStock]);

    return (
    <>
    
  <ModalDeleteMovById
      open={openModalDelete}
      movId={movimentDelete}
      onSuccess={async() => await getStockEntrada("")}
      onClose={() => {
      setOpenModalDelete(false);
      setMovimentDelete(null);
      }}
      />
  <ModalViewMovimentation
      open={openModalView}
      data={movimenDetails}
      onClose={() => {
      setOpenModalView(false);
      setMovimentDetails(null);
      }}
      />
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
   
    <Box display={"flex"} flexDirection={"column"} flexGrow={2} pl={{ xs: 0, md: 2 }}>
    <Stack display={"flex"} flexDirection={{ xs: "column", md: "row" }} flexGrow={2} justifyContent={"space-between"} flexWrap="wrap" gap={{ xs: 1, md: 2 }} >
    <Box display={"flex"} flexDirection={"column"}>
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
    Movimentações de Estoque
    </Typography>
    <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
    Visualize todas as entradas e saídas do estoque
    </Typography>
    </Box>
    </Stack>
    <Stack display={"flex"} flexDirection={{ xs: "column", md: "row" }} flexGrow={1} justifyContent={"space-between"} mt={8} mb={3} mr={2} justifyItems={"start"} alignItems={{ xs: "stretch", md: "start" }} alignContent={"start"} flexWrap="wrap" gap={{ xs: 1, md: 0 }}>
    <Stack display={"flex"} flexDirection={"row"}  gap={1}  mb={1} >
    <FileInput size={30} color="#ffff" />
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#FFFF"}}>
    Histórico de Movimentações
    </Typography>
    </Stack>
    <Stack display={"flex"} flexDirection={{ xs: "column", md: "row" }} gap={1.2} flexWrap="wrap">
    <TextField
    placeholder="Buscar por nº do documento"
  onChange={(e) => {
      searchRef.current = e.target.value;
      debounceSearch();
      }}
    size="small"
    sx={{
    width: { xs: "100%", md: 270 },

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
    label="Todos"
    background={tipoMovimentStock ==="TODOS" || tipoMovimentStock === ""? "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)": undefined}
    boxShadow={tipoMovimentStock ==="TODOS"|| tipoMovimentStock === ""? "0 0 20px rgba(245,159,10,0.35)" : undefined}
    onClick={() => {
      setTipoStock("TODOS");
    }}
  />
    <PrimaryActionButton
    label="Entradas"
    background={tipoMovimentStock ==="ENTRADA"? "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)": undefined}
    boxShadow={tipoMovimentStock ==="ENTRADA"? "0 0 20px rgba(245,159,10,0.35)" : undefined}
    onClick={() => {
      setTipoStock("ENTRADA");
    }}
  />
    <PrimaryActionButton
    label="Saídas"
    background={tipoMovimentStock ==="SAIDA"? "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)": undefined}
    boxShadow={tipoMovimentStock ==="SAIDA"? "0 0 20px rgba(245,159,10,0.35)" : undefined}
    onClick={() => {
      setTipoStock("SAIDA");
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
    {!loading && movimentations.length === 0 && (
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
    {!loading && movimentations.length > 0 && (
    <TableContainer
    sx={{
    maxHeight: "100%",
    mr: 5,
    mt: 2,
    overflowX: "auto",
    }}
    >
    <Table
    stickyHeader
    sx={{
    bgcolor: "transparent",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
    minWidth: 700,
    }}
    >
    {/* HEADER */}
    <TableHead>
    <TableRow>
    {["Tipo", "Nº Documento", "Origem/Destino", "Data", "Valor Total", "Ações"].map(
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
    {movimentationsPaginados.map((row) => (
    <TableRow
    key={row.nota}
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
    color: row.tipo.toUpperCase() ==='ENTRADA'? colorPositive : colorNegative,
    bgcolor:row.tipo.toUpperCase() ==='ENTRADA'? bgColorPositive : bgColorNegative ,
    }}
    >
    {row.tipo.toUpperCase() ==='ENTRADA'? <LogIn size={12} />:<LogOut size={12} />}
    {row.tipo.toUpperCase() ==='ENTRADA'? "Entrada" : "Saída"}
    </Box>
    <TableCell sx={cellStyleBold}>{row.nota}</TableCell>
    <TableCell sx={cellStyle}>{row.fornecedor ?? "-"}</TableCell>
    <TableCell sx={cellStyle}>{formatDateTime(row.data_ocorrencia)}</TableCell>
    <TableCell sx={cellStyleBold}>{maskCurrency(row.valor_total)}</TableCell>
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
    {!loading && movimentations.length > rowsPerPage && (
    <Box
    mt={3}
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={2}
    mb={2}
    flexWrap="wrap"
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