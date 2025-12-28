
  import {  ChevronLeft, ChevronRight, Mail, Pencil, Phone, Plus, ToggleLeft,  ToggleRight } from "lucide-react";
  import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
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
import type {  GroupClientEntity } from "./entity/ClientEntity";
import { bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, colorNegative, colorOpacity, colorPositive, primaryColor, rgbPrimaryColor } from "../../../theme/theme";
import { cellStyle, cellStyleBold, cellStyleWhite } from "../../../theme/cellTable";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import { CreateOrUpdateGroupModal } from "./componentes/CreateOrUpdateGroupModal";
import { getGroupClient, updateGroupClient } from "./repository/ClientRepository";
import type { GroupDTO } from "./dto/ClientDTO";



export function GroupClient() {
const [openGroupClientModal, setOpenGroupClientModal] = useState(false);
const [selectGroup, setSelectGroup] =useState<GroupClientEntity | null>(null);
const [group, setGroup] = useState<GroupClientEntity[]>([]);
const [grupoSelecionado, setGrupoSelecionado] = useState<GroupClientEntity | null>(null);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const rowsPerPage = 10;

const totalPages = Math.ceil(group.length / rowsPerPage);
const groupsPaginados = group.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);

    const fetchGroupClient = async (search: string) => {
    setLoading(true);

    try {
    const response = await getGroupClient(search);

    if (response?.success) {
    setGroup(response.data);
    if (page >= totalPages && totalPages > 0) {
    setPage(0);
    }
    }
    } finally {
    setLoading(false);
    }
    };

    const debounceSearch = () => {
    if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
    const value = searchRef.current.trim();

    if ( value !=='' && value.length < 1) return;

    fetchGroupClient(value);
    }, 1000);
    };


    const onChangedAtivo = async (g: GroupClientEntity)=> {
    try {
   const payload: GroupDTO = {
      nome: g.nome,
      descricao: g.descricao,
      desconto: g.desconto,
      ativo: !g.ativo,
    };
    setLoading(true);
    const response = await updateGroupClient(payload, g.id!);
    if (!response?.success) {
    setToastType("error");
    setToastMsg(response?.message ?? "Erro ao mudar status do grupo.");
    setToastOpen(true);
    return;
    }
    await fetchGroupClient(searchRef.current);
    } catch (error) {
    setToastType("error");
    setToastMsg("Erro ao mudar status do grupo.");
    setToastOpen(true);
    return;
    }finally {
    setLoading(false);
    }
    }

    useEffect(() => {
    if (jaCarregouRef.current) return;

    jaCarregouRef.current = true;
    fetchGroupClient("");
    }, []);

const handleEdit = (row: GroupClientEntity) => {
setGrupoSelecionado(row);// passa o grupo
setOpenGroupClientModal(true);//  abre modal
 };




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
    <CreateOrUpdateGroupModal
    open={openGroupClientModal}
    onClose={() => {
    setOpenGroupClientModal(false);
    setSelectGroup(null);   //  limpa ao fechar
    }}
    grupo={grupoSelecionado}
    onSuccess={async() => {
       await fetchGroupClient("");
    }} 
    />
    <Box flexDirection={"column"}>
    <Box display={"flex"} flexDirection={"column"} flexGrow={2} ml={2}>
    <Stack display={"flex"} flexDirection={"row"} flexGrow={1} justifyContent={"space-between"} justifyItems={"center"} alignContent={"center"}alignItems={"center"} >
    <Box display={"flex"} flexDirection={"column"}>
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
    Grupos de Clientes
    </Typography>
    <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
    Gerencie os grupos para categorizar seus clientes
    </Typography>
    </Box>
    <Stack display={"flex"} flexDirection={"row"} gap={2} mr={3} >
    <TextField
    placeholder="Buscar grupo..."
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
    }}
    />
    <Button
    startIcon={<Plus />}
    onClick={() => setOpenGroupClientModal(true)}
    sx={{
    height: 40,
    width:100,
    px: 3,
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: 1,
    background: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
    boxShadow: "0 0 20px rgba(245,159,10,0.35)",
    transition: "0.25s ease",
    "&:hover": {
    background: "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
    boxShadow: "0 0 25px rgba(245,159,10,0.55)",
    transform: "translateY(-1px)",
    },
    }}>
    Novo
    </Button>
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
    Carregando grupos...
    </Typography>
    </Stack>
    )}

    {/* LISTA VAZIA */}
    {!loading && group.length === 0 && (
    <Stack
    height={200}
    alignItems="center"
    justifyContent="center"
    >
    <Typography color={colorOpacity}>
    Nenhum grupo encontrado.
    </Typography>
    </Stack>
    )}

    {/* TABELA */}
    {!loading && group.length > 0 && (
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
    {["Nome", "Descrição", "Desconto", "Clientes","Status", "Ações"].map(
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
    {groupsPaginados.map((row, index) => (
    <TableRow
    key={`${row.id}/${index}`}
    sx={{
    backgroundColor: "rgba(255,255,255,0.02)",
    transition: "0.25s ease",
    "&:hover": {
    backgroundColor: "rgba(245,159,10,0.08)",
    },
    }}
    >
    <TableCell sx={cellStyleBold}>{row.nome}</TableCell>
    <TableCell sx={cellStyle}>{row.descricao}</TableCell>
    <TableCell sx={cellStyleWhite}>
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
    color: primaryColor,
    bgcolor: rgbPrimaryColor ,
    }}
    >
    {row.desconto}%
    </Box>
    </TableCell>
    <TableCell sx={cellStyleWhite}>{row.clients}</TableCell>
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
    <Box onClick={() => handleEdit(row)} sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, cursor: "pointer", color: colorOpacity, transition: "0.25s ease", "&:hover": { color: primaryColor, backgroundColor: "rgba(245,159,10,0.15)", boxShadow: "0 0 12px rgba(245,159,10,0.45)", transform: "translateY(-1px)", }, }} >
    <Pencil size={16} /> </Box> 
    {/* Ativar ou Desativar */} 
    <Box
    onClick={async() =>{
      await  onChangedAtivo(row)
    }}
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
    {!loading && group.length > rowsPerPage && (
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