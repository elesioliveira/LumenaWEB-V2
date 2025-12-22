
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
  } from "@mui/material";
  import { useRef, useState } from "react";
import { bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor } from "../../../theme/theme";
import { cellStyle, cellStyleBold } from "../../../theme/cellTable";
import { formatDateTime, maskCurrency } from "../../../shared/MaskUtils";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";
import { data } from "react-router-dom";


const movimenations = [ 
{nNota:"123",origem:'Fornecedor A', dataEmissao: "2024-06-01 10:00", dataEntrada: "2024-06-01 10:00", itens: 4, valor: 1500.00},
{nNota:"123",origem:'Fornecedor A', dataEmissao: "2024-06-01 10:00", dataEntrada: "2024-06-01 10:00", itens: 4, valor: 1500.00},
{nNota:"123",origem:'Fornecedor A', dataEmissao: "2024-06-01 10:00", dataEntrada: "2024-06-01 10:05", itens: 4, valor: 1555.55},
];

export function EntradaEstoque() {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
// const [selectedCategory, selectCategory] =useState<CategoryEntity | null>(null);
// const [categories, setCategories] = useState<CategoryEntity[]>([]);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const rowsPerPage = 10;

const totalPages = Math.ceil(movimenations.length / rowsPerPage);
const fornecedoresPaginados = movimenations.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);

    // const fetchCategories = async (search: string) => {
    // setLoading(true);

    // try {
    // const response = await getCategory(search);

    // if (response?.success) {
    // setCategories(response.data);
    // if (page >= totalPages && totalPages > 0) {
    // setPage(0);
    // }
    // }
    // } finally {
    // setLoading(false);
    // }
    // };

    const debounceSearch = () => {
    if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
    const value = searchRef.current.trim();

    if ( value !=='' && value.length < 3) return;

    // fetchCategories(value);
    }, 1000);
    };


    const openViewMoviment = async (r: any)=> {
    // open modal view
    }

    // useEffect(() => {
    // if (jaCarregouRef.current) return;

    // jaCarregouRef.current = true;
    // fetchCategories("");
    // }, []);

    const handleEdit = (row: any) => {
    // selectCategory(row);      //  passa a categoria
    // setOpenCategoryModal(true);    //  abre modal
    };




    return (
    <Box flexDirection={"column"}>
    <Box display={"flex"} flexDirection={"column"} flexGrow={2} ml={2}>
    <Stack display={"flex"} flexDirection={"row"} flexGrow={2} justifyContent={"space-between"} mr={2} alignContent={"center"} justifyItems={"center"} alignItems={"center"} >
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
    onClick={() =>{}}
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
    {!loading && movimenations.length === 0 && (
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
    {!loading && movimenations.length > 0 && (
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
    {fornecedoresPaginados.map((row) => (
    <TableRow
    key={row.nNota}
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
    <TableCell sx={cellStyleBold}>{row.nNota}</TableCell>
    <TableCell sx={cellStyleBold}>{row.origem}</TableCell>
    <TableCell sx={cellStyle}>{formatDateTime(row.dataEmissao)}</TableCell>
    <TableCell sx={cellStyle}>{formatDateTime(row.dataEntrada)}</TableCell>
    <TableCell sx={cellStyleBold}>{row.itens}</TableCell>
    <TableCell sx={cellStyleBold}>{maskCurrency(row.valor)}</TableCell>
    <TableCell sx={cellStyle}> <Stack direction="row" spacing={1} justifyContent="start" alignItems="start" > 
     {/* Visualizar */} 
    <Box
    onClick={() => openViewMoviment(row)}
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
    <Box onClick={() => handleEdit(row)} sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, cursor: "pointer", color: colorOpacity, transition: "0.25s ease", 
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
    {!loading && movimenations.length > rowsPerPage && (
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

    );
    }