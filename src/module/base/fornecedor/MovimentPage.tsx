
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
  } from "@mui/material";
  import { useRef, useState } from "react";
import { bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor } from "../../../theme/theme";
import { cellStyle, cellStyleBold } from "../../../theme/cellTable";
import { formatDateTime, maskCurrency } from "../../../shared/MaskUtils";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";


const movimenations = [ 
{tipo: "Entrada",numNota:"123",origem:'Fornecedor A', data: "2024-06-01 10:00", valor: 1500.00, isEntry: true},
{tipo: "Saída",numNota:"123",origem:'Fornecedor A', data: "2024-06-01 10:00", valor: 1500.00, isEntry: false},
{tipo: "Entrada",numNota:"123",origem:'Fornecedor A', data: "2024-06-01 10:00", valor: 1500.00, isEntry: true},
];

export function MovimentPage() {
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
const [filter, setFilter] = useState<"all" | "entry" | "output">("all");
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
    <Stack display={"flex"} flexDirection={"row"} flexGrow={2} justifyContent={"space-between"} >
    <Box display={"flex"} flexDirection={"column"}>
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
    Movimentações de Estoque
    </Typography>
    <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
    Visualize todas as entradas e saídas do estoque
    </Typography>
    </Box>
    </Stack>
    <Stack display={"flex"} flexDirection={"row"} flexGrow={1} justifyContent={"space-between"} mt={8} mb={3} mr={2} justifyItems={"start"}  alignItems={"start"} alignContent={"start"}>
    <Stack display={"flex"} flexDirection={"row"}  gap={1}  mb={1} >
    <FileInput size={30} color="#ffff" />
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#FFFF"}}>
    Histórico de Movimentações
    </Typography>
    </Stack>
    <Stack display={"flex"} flexDirection={"row"} gap={1.2}>
    <TextField
    placeholder="Buscar por nº do documento"
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
    label="Todos"
    background={filter ==="all"? "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)": undefined}
    boxShadow={filter ==="all"? "0 0 20px rgba(245,159,10,0.35)" : undefined}
    onClick={() => {
      setFilter("all");
    }}
  />
    <PrimaryActionButton
    label="Entradas"
    background={filter ==="entry"? "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)": undefined}
    boxShadow={filter ==="entry"? "0 0 20px rgba(245,159,10,0.35)" : undefined}
    onClick={() => {
      setFilter("entry");
    }}
  />
    <PrimaryActionButton
    label="Saídas"
    background={filter ==="output"? "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)": undefined}
    boxShadow={filter ==="output"? "0 0 20px rgba(245,159,10,0.35)" : undefined}
    onClick={() => {
      setFilter("output");
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
    {!loading && movimenations.length === 0 && (
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
    {["Tipo", "Nº Documento", "Origem", "Data", "Valor Total", "Ações"].map(
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
    key={row.numNota}
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
    color: row.isEntry ===true? colorPositive : colorNegative,
    bgcolor:row.isEntry ===true? bgColorPositive : bgColorNegative ,
    }}
    >
    {row.isEntry ===true? <LogIn size={12} />:<LogOut size={12} />}
    {row.isEntry ===true? "Entrada" : "Saída"}
    </Box>
    <TableCell sx={cellStyleBold}>{row.numNota}</TableCell>
    <TableCell sx={cellStyle}>{row.origem ?? "-"}</TableCell>
    <TableCell sx={cellStyle}>{formatDateTime(row.data)}</TableCell>
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