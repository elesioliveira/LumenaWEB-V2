
  import {  ChevronLeft, ChevronRight,Funnel,  Pencil, Plus, ToggleLeft,  ToggleRight, TrendingUp, } from "lucide-react";
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
import { bgColorCardsDashBoard, bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, bordasComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor } from "../../../theme/theme";
import { cellStyle } from "../../../theme/cellTable";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import type { CategoryDTO, CategoryModalDTOAPI, SummaryCardDTO, totalCategoriasAtivas } from "./dto/WalletDTO";
import {  maskCurrency } from "../../../shared/MaskUtils";
import { SummaryCard } from "./components/SummaryCardComponent";
import { categoriasCoresView, categoriaSummaryCardMock, tipoReceita, typeOfCategoryList } from "./mocks/WalletMocks";
import { BaseSelect } from "./components/SizedSelect";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";
import { getCategoriabgColorNeonStylr, getCategoriaFontNeonStylr,  } from "./helpers/WallletHelpers";
import { CreateOrUpdateCategoryWallet } from "./components/ModalCreateOrUpdateCategory";
import { fetchCategory, fetchCategoryActives, submitUpdateCategory } from "./repository/WalletRepository";



export function CategoriaTab() {
const [categorySelected, setCategoryWallet] = useState<CategoryDTO | null>(null);
const [openModal, setOpenModal] = useState<boolean>(false);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const rowsPerPage = 10;
const [categories, setCategory] = useState<CategoryDTO[]>([]);
const [categoriasAtiva, setTotalCategoriasAtivas] = useState<totalCategoriasAtivas | null>(null);
const [typeOfCategory, setTypeOfPayment] = useState<string>("Todos");
const jaCarregouRefTypeOfStatus = useRef(false);
const totalPages = Math.ceil(categories.length / rowsPerPage);
const categoriesPaginados = categories.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);



const fetchCategories = async (nome: string |null, tipo: string | null ) => {
  setLoading(true);
  setPage(0);
  const result = await fetchCategory(nome, tipo ==='Todos'? null : tipo);
  if (!result?.success) {
  setToastType("error");
  setToastMsg(result?.message ?? "Erro ao buscar suas categorias.");
  setToastOpen(true);
  return;
  }
  setCategory(result.data);
  setLoading(false);
};


const handleEdit = async (row: CategoryDTO) => {
  setCategoryWallet(row);
  setOpenModal(true);
};
 

const debounceSearch =async () => {
if (debounceTimeout.current) {
clearTimeout(debounceTimeout.current);
}

debounceTimeout.current = setTimeout(async() => {
const value = searchRef.current.trim();

if ( value !=='' && value.length < 3) return;

await  fetchCategories(value,typeOfCategory === "Todos"? null: typeOfCategory);
}, 1000);
};


const onChangedAtivo = async (row: CategoryDTO)=> {
try {
const payload : CategoryModalDTOAPI= {
descricao: row.descricao?.trim() ?? null,
nome: row.nome.trim(),
tipo: row.tipo,
cor: row.cor,
ativo: !row.ativo,
};

setLoading(true);
const response = await submitUpdateCategory(payload, row.id);
if (!response?.success) {
setToastType("error");
setToastMsg(response?.message ?? "Erro ao mudar status do cliente.");
setToastOpen(true);
return;
}
await fetchCategories(searchRef.current, typeOfCategory);
await fetchCategoriesAtives();
} catch (error) {
setToastType("error");
setToastMsg("Erro ao mudar status da categoria.");
setToastOpen(true);
return;
}finally {
setLoading(false);
}
}

const fetchCategoriesAtives = async () => {
    const result = await fetchCategoryActives();
    if (result.success) {
    setTotalCategoriasAtivas(result.data);
    }
};

    useEffect(() => {
    if (jaCarregouRef.current) return;
    jaCarregouRef.current = true;
    const loadView = async () => {
      setLoading(true);
      await fetchCategoriesAtives();
      await fetchCategories(searchRef.current, typeOfCategory === "Todos"? null: typeOfCategory);
      setLoading(false);
    };
    loadView();
    }, []);

useEffect(()=> {
  if(!jaCarregouRefTypeOfStatus.current) return;
  fetchCategories(searchRef.current, typeOfCategory === "Todos"? null: typeOfCategory);
},[typeOfCategory]);


    return (
        <>
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
    
    <CreateOrUpdateCategoryWallet
    open={openModal}
    onClose={() => {
    setOpenModal(false);
    setCategoryWallet(null);
    }}
    onSuccess={async() => {
    await fetchCategories(searchRef.current,typeOfCategory === "Todos"? null: typeOfCategory)
    setCategoryWallet(null);
    setOpenModal(false);
    }}   //  recarrega lista
    category={categorySelected}  //  passa via props
    />
    <Stack display={"flex"} flexDirection={"row"} flexGrow={1} gap={2} mr={2} mb={4}>
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      sx={{
        border: "1px solid rgba(40, 61, 107, 0.4)",
        p: 4,
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        transition: "0.3s ease",

        "&:hover": {
          boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
          borderColor: "rgba(40, 61, 107, 0.9)",
          transform: "translateY(0px)",
        },

        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
          opacity: 0,
          transition: "0.3s ease",
        },

        "&:hover:before": {
          opacity: 1,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontWeight={500} color="white" fontSize="1rem">
          Categorias de Receita
        </Typography>
        <TrendingUp color={colorPositive}/>
      </Stack>

      <Typography fontWeight={600} color={colorPositive} fontSize="1.6rem">
        {categoriasAtiva?.totalReceita ?? 0}
      </Typography>

      <Typography fontWeight={200} color={colorOpacity} fontSize="1.2rem">
        categorias ativas
      </Typography>
    </Box>
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      sx={{
        border: "1px solid rgba(40, 61, 107, 0.4)",
        p: 4,
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        transition: "0.3s ease",

        "&:hover": {
          boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
          borderColor: "rgba(40, 61, 107, 0.9)",
          transform: "translateY(0px)",
        },

        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
          opacity: 0,
          transition: "0.3s ease",
        },

        "&:hover:before": {
          opacity: 1,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontWeight={500} color="white" fontSize="1rem">
          Categorias de Despesa
        </Typography>
        <TrendingUp color={colorNegative}/>
      </Stack>

      <Typography fontWeight={600} color={colorNegative} fontSize="1.6rem">
        {categoriasAtiva?.totalDespesa ?? 0}
      </Typography>
      <Typography fontWeight={200} color={colorOpacity} fontSize="1.2rem">
        categorias ativas
      </Typography>
    </Box>
    </Stack>
    <Box display={"flex"} flexDirection={"column"} flexGrow={1} ml={2}>
        <Stack display={"flex"} flexDirection={"row"} gap={1} alignContent={"center"} alignItems={"center"}>
            <Funnel/>
            <Typography fontWeight={600} display={"flex"} color={"white"} fontSize={"1.6rem"}>
                Filtros
            </Typography>
        </Stack>
    <Stack display={"flex"}  flexGrow={1} flexDirection={"row"} gap={2} mr={4} mt={2} alignContent={"center"} alignItems={"start"} justifyContent={"space-between"}>
    <Stack display={"flex"} flexDirection={"row"}gap={2}  alignContent={"center"} alignItems={"start"}>
    <TextField
    placeholder="Buscar categoria..."
    variant="outlined"
    type="text"
    size="medium"
    onChange={(e) => {
    searchRef.current = e.target.value;
     debounceSearch();
    }}
    sx={{
    // INPUT ROOT
    minWidth:400,
        transition: "0.3s ease",
        "&:hover": {
          boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
          borderColor: "rgba(40, 61, 107, 0.9)",
          transform: "translateY(0px)",
        },

        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
          opacity: 0,
          transition: "0.3s ease",
        },

        "&:hover:before": {
          opacity: 1,
        },
    "& .MuiOutlinedInput-root": {
    backgroundColor: bgColorTopSellers, // fundo
  
    //DEFINE AS BORDAS DO TEXTFIELD
    "& .MuiOutlinedInput-notchedOutline": {
        border: bordasComponents,
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
    }}
    />
    <BaseSelect
      value={typeOfCategory}
      height={45}
      sx={{
        width:200
      }}
      onChange={(e) => {
        jaCarregouRefTypeOfStatus.current = true;
        setTypeOfPayment(e.target.value);
      }}
      options={typeOfCategoryList.map((status) => ({
        value: status,
        label: status,
      }))}
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
    />

   
    </Stack>
    <PrimaryActionButton
    label="Nova Categoria"
    boxShadow="0 0 20px rgba(245,159,10,0.35)"
    background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
    startIcon={<Plus />}
    sx={{
      width:200,
      height:50,
    }}
    onClick={async() => setOpenModal(true)}
    />
    </Stack>
    </Box>
    <Box flexDirection={"column"} >
    <Box display={"flex"} flexDirection={"column"} flexGrow={1} ml={2}>
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
    Carregando movimentaçoes...
    </Typography>
    </Stack>
    )}

    {/* LISTA VAZIA */}
    {!loading && categories.length === 0 && (
    <Stack
    height={200}
    alignItems="center"
    justifyContent="center"
    >
    <Typography color={colorOpacity}>
    Nenhuma movimentação encontrado.
    </Typography>
    </Stack>
    )}
    {/* TABELA */}
    {!loading && categories.length > 0 && (
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
    {["Cor", "Nome", "Tipo", "Descrição", "Ativo", "Ações"].map(
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
    {categoriesPaginados.map((row, index) => (
      

    <TableRow
    key={`${row.id}/${index}`}
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
    <TableCell sx={cellStyle}>
    <Box
        sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        backgroundColor: row.cor,
        display: "inline-block",
        }}
    />
    </TableCell>
    <TableCell sx={cellStyle}>{row.nome ?? "-"}</TableCell>
    <TableCell sx={cellStyle}>
    <Box
    sx={{
    width: 80,
    height: 22,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    fontWeight: 600,
    color: getCategoriaFontNeonStylr(row.tipo),
    bgcolor:getCategoriabgColorNeonStylr(row.tipo),
    }}
    >
    {row.tipo}
    </Box>
    </TableCell>
    <TableCell sx={cellStyle}>{row.descricao ?? "-"}</TableCell>

    <TableCell sx={cellStyle}>
    <Box
    sx={{
    width: 80,
    height: 22,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    fontWeight: 600,
    color: row.ativo ===true? colorPositive : colorNegative,
    bgcolor:row.ativo ===true? bgColorPositive : bgColorNegative ,
    }}
    >
    {row.ativo ===true? "ativo" : "desativado"}
    </Box>
    </TableCell>
    <TableCell sx={cellStyle}> <Stack direction="row" spacing={1} justifyContent="start" alignItems="start" > 
    {/* EDITAR */} 
    <Box onClick={() =>handleEdit(row)} sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, cursor: "pointer", color: colorOpacity, transition: "0.25s ease", "&:hover": { color: primaryColor, backgroundColor: "rgba(245,159,10,0.15)", boxShadow: "0 0 12px rgba(245,159,10,0.45)", transform: "translateY(-1px)", }, }} >
    <Pencil size={16} /> </Box> 
    {/* Ativar ou Desativar */} 
    <Box
    onClick={() => onChangedAtivo(row)}
    sx={{
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
    cursor: "pointer",
    color: row.ativo ? colorPositive : colorNegative,
    transition: "0.25s ease",
    "&:hover": {
    backgroundColor: row.ativo
    ? "rgba(0,200,83,0.15)"
    : "rgba(255,50,50,0.15)",
    boxShadow: row.ativo
    ? "0 0 12px rgba(0,200,83,0.45)"
    : "0 0 12px rgba(255,50,50,0.45)",
    transform: "translateY(-1px)",
    },
    }}>
    {row.ativo ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
    </Box>
    </Stack> 
    </TableCell>
    </TableRow>
    ))}
    </TableBody>
    </Table>
    </TableContainer>
    )}
    {!loading && categories.length > rowsPerPage && (
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