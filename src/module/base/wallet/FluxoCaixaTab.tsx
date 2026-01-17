
  import {  ChevronLeft, ChevronRight, DollarSign, Funnel, Info, Mail, Pencil, Phone, Plus, ToggleLeft,  ToggleRight, TrendingDown, TrendingUp } from "lucide-react";
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
  MenuItem,
  } from "@mui/material";
  import { useEffect, useRef, useState } from "react";
import { bgColorCardsDashBoard, bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, bordasComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor, textFieldStyle } from "../../../theme/theme";
import { cellStyle, cellStyleBold, cellStyleWhite } from "../../../theme/cellTable";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import type { MovimentacaoWalletDTO, SummaryCardDTO } from "./dto/WalletDTO";
import { formatDateTime, maskCurrency } from "../../../shared/MaskUtils";
import { SummaryCard } from "./components/SummaryCardComponent";
import { movimentacoesWalletMock, optionsPeriodoMovWallet, optionsStatusMovWallte, FluxoSummaryCardMock, typeOfMovimenttion } from "./mocks/WalletMocks";
import { BaseSelect } from "./components/SizedSelect";
import { getStatusNeonBgColor, getStatusNeonFontStyle } from "./helpers/WallletHelpers";



export function MovimentacaoWalletTab() {
const [openClientModal, setOpenClientModal] = useState(false);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const rowsPerPage = 10;
const [movimentacoes, setMovimentacao] = useState<MovimentacaoWalletDTO[]>(movimentacoesWalletMock);
const [summaryCard, setSummary] = useState<SummaryCardDTO[]>(FluxoSummaryCardMock);
const [typeOfMov, setTypeOfMov] = useState<string>("Todos os tipos");
const [selectStatus, setSelectStatus] = useState<string>("Todos Status");
const [selectPeriodo, setSelectPeriodo] = useState<string>("Este mês");
const jaCarregouRefTypeOfStatus = useRef(false);
const totalPages = Math.ceil(movimentacoes.length / rowsPerPage);
const movimentacoesPaginados = movimentacoes.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);


const fetchClientDetails = async(row: any) => {
    //corrigir aqui
    // setLoading(true);
    // try {
    //     const result = await getClientDetails(row.id);
    // if (!result.success) {
    // setToastType("error");
    // setToastMsg(result?.message ?? "Erro ao buscar grupos de clientes.");
    // setToastOpen(true);
    // return;
    // }
    // await fetchGroup();
    // setClientDetails(result.data);
    // setOpenClientModal(true); 
    // } catch (error) {
    // setToastType("error");
    // setToastMsg("Erro ao buscar grupos de clientes.");
    // setToastOpen(true);
    // return; 
    // } 
    // finally{
    // setLoading(false);
    // }
}

const fetchGroup = async() => {
    //corrigir aqui
    //    setLoading(true);
    // try {
    // const response = await getGroupClient("", true);
    // if (!response.success) {
    // setToastType("error");
    // setToastMsg(response?.message ?? "Erro ao buscar grupos de clientes.");
    // setToastOpen(true);
    // return;
    // }
    // setGrupos(response.data);
    // setOpenClientModal(true);
    // } catch (error) {
    // setToastType("error");
    // setToastMsg("Erro ao buscar grupos de clientes.");
    // setToastOpen(true);
    // return; 
    // } finally{
    //     setLoading(false);
    // }
};

    const fetchClient = async (search: string) => {
    //corrigir aqui
        // setLoading(true);

    // try {
    // const response = await getClient(search);

    // if (response?.success) {
    // setClients(response.data);
    // if (page >= totalPages && totalPages > 0) {
    // setPage(0);
    // }
    // }
    // } finally {
    // setLoading(false);
    // }
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


    const onChangedAtivo = async (f: any)=> {
    //corrigir aqui
    // try {
    // const payload : ClientStatusDTO= {
    //     id: f.id,
    //     status: !f.ativo
    // };

    // setLoading(true);
    // const response = await putStatusClient(payload);
    // if (!response?.success) {
    // setToastType("error");
    // setToastMsg(response?.message ?? "Erro ao mudar status do cliente.");
    // setToastOpen(true);
    // return;
    // }
    // await fetchClient(searchRef.current);
    // } catch (error) {
    // setToastType("error");
    // setToastMsg("Erro ao mudar status do cliente.");
    // setToastOpen(true);
    // return;
    // }finally {
    // setLoading(false);
    // }
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
    
    {/* <CreatOrUpdateClientModal
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
    /> */}
    <Stack display={"flex"} flexDirection={"row"} flexGrow={1} gap={2} mr={2} mb={4}>
    {summaryCard.length >0 && (
    summaryCard.map((i, index) => 
    <SummaryCard
     key={index}
    title={i.title}
    value={maskCurrency(i.valor)}
    subtitle= { summaryCard[index].descricao !== 'Atualizado hoje' ? i.descricao : `Período: ${selectPeriodo}`} 
    valueColor={i.positive? colorPositive : colorNegative}
    borderStyle={bordasComponents}
    icon={i.title ==='Saldo Atual'? <DollarSign color="#FFD300"/> : i.positive===true?  <TrendingUp color={colorPositive} /> : <TrendingDown color={colorNegative}/>}
    />)
    )}
    </Stack>
    <Box display={"flex"} flexDirection={"column"} flexGrow={1} ml={2}>
        <Stack display={"flex"} flexDirection={"row"} gap={1} alignContent={"center"} alignItems={"center"}>
            <Funnel/>
            <Typography fontWeight={600} display={"flex"} color={"white"} fontSize={"1.6rem"}>
                Filtros
            </Typography>
        </Stack>
    <Stack display={"flex"} flexDirection={"row"} gap={2} mr={2} mt={2} alignContent={"center"} alignItems={"start"}>
    <TextField
    placeholder="Buscar cliente..."
    variant="outlined"
    type="text"
    size="medium"
    onChange={(e) => {
    searchRef.current = e.target.value;
     debounceSearch();
    }}
    sx={{
    // INPUT ROOT
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
    flex:2,
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
  value={typeOfMov}
  height={45}
  sx={{
    flex:1
  }}
  onChange={(e) => {
    jaCarregouRefTypeOfStatus.current = true;
    setTypeOfMov(e.target.value);
  }}
  options={typeOfMovimenttion.map((status) => ({
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
<BaseSelect
  value={selectStatus}
  height={45}
  sx={{
    flex:1
  }}
  onChange={(e) => {
    setSelectStatus(e.target.value);
  }}
  options={optionsStatusMovWallte.map((status) => ({
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
<BaseSelect
  value={selectPeriodo}
  height={45}
  sx={{
    flex:1
  }}
  onChange={(e) => {
    setSelectPeriodo(e.target.value);
  }}
  options={optionsPeriodoMovWallet.map((status) => ({
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
    {!loading && movimentacoes.length === 0 && (
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
    {!loading && movimentacoes.length > 0 && (
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
    {["Data", "Descrição", "Categoria", "Origem", "Status", "Valor"].map(
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
    {movimentacoesPaginados.map((row, index) => (
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
    <TableCell sx={cellStyleWhite}>{formatDateTime(row.data_cadastro) }</TableCell>
    <TableCell sx={cellStyleWhite}>{row.descricao}</TableCell>
    <TableCell sx={cellStyleWhite}>{row.categoria}</TableCell>
    <TableCell sx={cellStyleWhite}>{row.origem}</TableCell>
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
    color:getStatusNeonFontStyle(row.status),
    bgcolor: getStatusNeonBgColor(row.status),
    }}
    >
    {row.status}
    </Box>
    </TableCell>
    <TableCell sx={{fontSize:"0.85rem",fontWeight:600, color: getStatusNeonFontStyle(row.status) ,borderBottom: "1px solid rgba(40, 61, 107, 0.25)",}}>{maskCurrency(row.valor)}</TableCell>
    </TableRow>
    ))}
    </TableBody>
    </Table>
    </TableContainer>
    )}
    {!loading && movimentacoes.length > rowsPerPage && (
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