
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
import type { ClientDetailsEntity, ClientEntity, GroupClientEntity } from "./entity/ClientEntity";
import { bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor } from "../../../theme/theme";
import { cellStyle, cellStyleBold, cellStyleWhite } from "../../../theme/cellTable";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import { CreatOrUpdateClientModal } from "./componentes/CreateOrUpdateClientModal";
import { getClient, getClientDetails, getGroupClient, putStatusClient } from "./repository/ClientRepository";
import { ufMocks } from "./mocks/ClientMocks";
import type { ClientStatusDTO } from "./dto/ClientDTO";
import { useResponsive } from "../../../shared/useResponsive";



export function ClientPage() {
const { isMobile } = useResponsive();
const [openClientModal, setOpenClientModal] = useState(false);
const [clients, setClients] = useState<ClientEntity[]>([]);
const [grupos, setGrupos] = useState<GroupClientEntity []>([]);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const [clientDetails, setClientDetails] = useState<ClientDetailsEntity | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const rowsPerPage = 10;

const totalPages = Math.ceil(clients.length / rowsPerPage);
const clientsPaginados = clients.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);


const fetchClientDetails = async(row: ClientEntity) => {
    setLoading(true);
    try {
        const result = await getClientDetails(row.id);
    if (!result.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao buscar grupos de clientes.");
    setToastOpen(true);
    return;
    }
    await fetchGroup();
    setClientDetails(result.data);
    setOpenClientModal(true); 
    } catch (error) {
    setToastType("error");
    setToastMsg("Erro ao buscar grupos de clientes.");
    setToastOpen(true);
    return; 
    } 
    finally{
    setLoading(false);
    }
}

const fetchGroup = async() => {
       setLoading(true);
    try {
    const response = await getGroupClient("", true);
    if (!response.success) {
    setToastType("error");
    setToastMsg(response?.message ?? "Erro ao buscar grupos de clientes.");
    setToastOpen(true);
    return;
    }
    setGrupos(response.data);
    setOpenClientModal(true);
    } catch (error) {
    setToastType("error");
    setToastMsg("Erro ao buscar grupos de clientes.");
    setToastOpen(true);
    return; 
    } finally{
        setLoading(false);
    }
};

    const fetchClient = async (search: string) => {
    setLoading(true);

    try {
    const response = await getClient(search);

    if (response?.success) {
    setClients(response.data);
    if (page >= totalPages && totalPages > 0) {
    setPage(0);
    }
    }
    } finally {
    setLoading(false);
    }
    };

    const debounceSearch =async () => {
    if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async() => {
    const value = searchRef.current.trim();

    if ( value !=='' && value.length < 3) return;

  await  fetchClient(value);
    }, 1000);
    };


    const onChangedAtivo = async (f: ClientEntity)=> {
    try {
    const payload : ClientStatusDTO= {
        id: f.id,
        status: !f.ativo
    };

    setLoading(true);
    const response = await putStatusClient(payload);
    if (!response?.success) {
    setToastType("error");
    setToastMsg(response?.message ?? "Erro ao mudar status do cliente.");
    setToastOpen(true);
    return;
    }
    await fetchClient(searchRef.current);
    } catch (error) {
    setToastType("error");
    setToastMsg("Erro ao mudar status do cliente.");
    setToastOpen(true);
    return;
    }finally {
    setLoading(false);
    }
    }

    useEffect(() => {
    if (jaCarregouRef.current) return;

    jaCarregouRef.current = true;
    fetchClient("");
    }, []);




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
    <CreatOrUpdateClientModal
    open={openClientModal}
    onClose={() => {
    setOpenClientModal(false);
    setClientDetails(null);   //  limpa ao fechar
    }}
    grupo={grupos}
    onSuccess={async() => {
    await fetchClient("")
    setOpenClientModal(false);
    setClientDetails(null);   //  limpa ao fechar
    }}   //  recarrega lista
    client={clientDetails}  //  passa via props
    />
    <Box flexDirection={"column"} >
    <Box display={"flex"} flexDirection={"column"} flexGrow={2} pl={{ xs: 0, md: 2 }}>
    <Stack display={"flex"} flexDirection={{ xs: "column", md: "row" }} flexGrow={1} justifyContent={"space-between"} justifyItems={"center"} alignContent={"center"} alignItems={{ xs: "stretch", md: "center" }} flexWrap="wrap" gap={{ xs: 1, md: 2 }} >
    <Box display={"flex"} flexDirection={"column"}>
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
    Clientes
    </Typography>
    <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
    Gerencie os clientes do sistema
    </Typography>
    </Box>
    <Stack display={"flex"} flexDirection={{ xs: "column", md: "row" }} gap={{ xs: 1, md: 2 }} mr={{ xs: 0, md: 3 }} flexWrap="wrap" >
    <TextField
    placeholder="Buscar cliente..."
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
    }}
    />
    <Button
    startIcon={<Plus />}
    onClick={async() => await fetchGroup()}
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
    Carregando clientes...
    </Typography>
    </Stack>
    )}

    {/* LISTA VAZIA */}
    {!loading && clients.length === 0 && (
    <Stack
    height={200}
    alignItems="center"
    justifyContent="center"
    >
    <Typography color={colorOpacity}>
    Nenhum cliente encontrado.
    </Typography>
    </Stack>
    )}

    {/* TABELA */}
    {!loading && clients.length > 0 && (
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
    minWidth: 800,
    }}
    >
    {/* HEADER */}
    <TableHead>
    <TableRow>
    {["Nome", "Contato", "CPF/CNPJ", "GRUPO", "Cidade", "Status", "Ações"].map(
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
    {clientsPaginados.map((row, index) => (
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
    <Box display={"flex"} flexDirection={"column"} alignItems={"start"} justifyContent={"center"}>
    <Typography fontSize={"0.9rem"} fontWeight={600} color={"#FFF"}>
        {row.nome}
    </Typography>
    <Typography fontSize={"0.8rem"} fontWeight={400} color={colorOpacity}>
        {row.tipo ===1 ?"Pessoa Física" :"Pessoa Jurídica"}
    </Typography>
    </Box>
    </TableCell>
    <TableCell sx={cellStyle}>
    <Box display={"flex"} flexDirection={"column"} alignItems={"start"} justifyContent={"center"}>
<Stack display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={1}>
    <Phone size={15} color="#FFFF"/>
    <Typography fontSize={"0.9rem"} fontWeight={400} color={"#FFF"}>
        {row.telefone}
    </Typography> 
</Stack>
<Stack display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={1}>
    <Mail size={15} color="#FFFF"/>
    <Typography fontSize={"0.9rem"} fontWeight={400} color={colorOpacity}>
        {row.email}
    </Typography> 
</Stack>
    </Box>
    </TableCell>
    <TableCell sx={cellStyleWhite}>{row.documento ?? "-"}</TableCell>
    <TableCell sx={cellStyleWhite}>{row.grupo ?? "-"}</TableCell>
    <TableCell sx={cellStyleWhite}>{row.local ?? "-"}</TableCell>
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
    <Box onClick={async () => await fetchClientDetails(row)} sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, cursor: "pointer", color: colorOpacity, transition: "0.25s ease", "&:hover": { color: primaryColor, backgroundColor: "rgba(245,159,10,0.15)", boxShadow: "0 0 12px rgba(245,159,10,0.45)", transform: "translateY(-1px)", }, }} >
    <Pencil size={16} /> </Box> 
    {/* Ativar ou Desativar */} 
    <Box
    onClick={() =>{
    onChangedAtivo(row)
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
    {!loading && clients.length > rowsPerPage && (
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