
  import {  ChevronLeft, ChevronRight, Eye, FileInput, LogIn, LogOut, Plus, Trash2 } from "lucide-react";
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
import { bgColorNegative,  bgComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor } from "../../../theme/theme";
import { cellStyle, cellStyleBold } from "../../../theme/cellTable";
import { formatDateTime, maskCurrency } from "../../../shared/MaskUtils";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";
import { CreateEntradaEstoqueModal } from "./componentes/ModalCreateEntryMovimentation";
import { fetchFornecedor, fetchStockDetails, fetchStock } from "./repository/StockRepository";
import type { FornecedorProduct } from "../produto/produto/entity/ProductEntity";
import type { MovimetDetails, StockEntradaEntity } from "./entity/StockEntity";
import { ModalDeleteMovById } from "./componentes/ModalDeleteMov";
import { ModalViewMovimentation } from "./componentes/ModalViewMovimentation";
import { useResponsive } from "../../../shared/useResponsive";




export function EntradaEstoque() {
const { isMobile } = useResponsive();
const [openModalCreate, setModalCreate] = useState(false);
const [openModalDelete, setOpenModalDelete] = useState(false);
const [movimentDelete, setMovimentDelete] =useState<number |null>(null);
const [openModalView, setOpenModalView] = useState(false);
const [movimenDetails, setMovimentDetails] = useState<MovimetDetails| null>(null);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const [loading, setLoading] = useState(false);
const jaCarregouRef = useRef(false);
const [fornecedores, setFornecedores] = useState<FornecedorProduct[]>([]);
const [movimentations, setMovimentations] = useState<StockEntradaEntity[]>([]);
const [page, setPage] = useState(0);
const rowsPerPage = 10;

const totalPages = Math.ceil(movimentations.length / rowsPerPage);
const movimentatinsPaginados = movimentations.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);

const fetchMoviment = async (row: StockEntradaEntity) => {
  setLoading(true);
  try {
    const result = await fetchStockDetails(row.movimentacao_id);
     if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro. Não foi possível encontrar a movimentação");
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




const getFornecedor = async () => {
  try {
    setLoading(true);
    const result = await fetchFornecedor();
    if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao mudar status do fornecedor.");
    setToastOpen(true);
    return;
    }
    setFornecedores(result.data);
  } catch (error: any) {
        setToastType("error");
    setToastMsg(error.toString() ?? "Erro ao mudar status do fornecedor.");
    setToastOpen(true);
  } finally{
    setLoading(false);
  }
}

const getStockEntrada = async (search?: string) => {
  setLoading(true);

  try {
    const result = await fetchStock(search, "ENTRADA");

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
  getStockEntrada("");
}, []);

    return (
      
      <>
     <CreateEntradaEstoqueModal
         open={openModalCreate}
         fornecedores={fornecedores}
         onSuccess={async()=> {}}
         onClose={async() => {
          await getStockEntrada("");
         setModalCreate(false);
         }}
         />
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
    <Stack display={"flex"} flexDirection={{ xs: "column", md: "row" }} flexGrow={2} justifyContent={"space-between"} mr={2} alignContent={"center"} justifyItems={"center"} alignItems={{ xs: "stretch", md: "center" }} flexWrap="wrap" gap={{ xs: 1, md: 2 }} >
    <Box display={"flex"} flexDirection={"column"}>
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
    Entrada de Notas
    </Typography>
    <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
    Gerencie as entradas de notas fiscais no estoque
    </Typography>
    </Box>
    <PrimaryActionButton
    label="Nova Entrada"
    boxShadow="0 0 20px rgba(245,159,10,0.35)"
    background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
    startIcon={<Plus />}
    onClick={async() => {
      await getFornecedor();
      setModalCreate(true)
    }}
  />
    </Stack>
    <Stack display={"flex"} flexDirection={"row"} flexGrow={1} gap={1} justifyContent={"flex-start"} mt={8} mb={0} mr={2} justifyItems={"start"}  alignItems={"start"} alignContent={"start"}>
    <FileInput size={30} color="#ffff" />
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#FFFF"}}>
    Notas de Entrada
    </Typography>
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
    Nenhuma entrada encontrada.
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
    {["Nº Documento","Fornecedor","Data Emissão", "Data Entrada",  "Itens", "Valor Total", "Ações"].map(
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
    {movimentatinsPaginados.map((row) => (
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
    <TableCell sx={cellStyleBold}>{row.nota}</TableCell>
    <TableCell sx={cellStyleBold}>{row.fornecedor}</TableCell>
    <TableCell sx={cellStyle}>{formatDateTime(row.data_emissao, false)}</TableCell>
    <TableCell sx={cellStyle}>{formatDateTime(row.data_ocorrencia)}</TableCell>
    <TableCell sx={cellStyleBold}>{row.total_itens}</TableCell>
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
    <Box onClick={() =>handleSelectMovDelete(row)} sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, cursor: "pointer", color: colorOpacity, transition: "0.25s ease", 
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