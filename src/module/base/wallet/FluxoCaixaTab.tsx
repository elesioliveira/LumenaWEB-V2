
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
  } from "@mui/material";
  import { useEffect, useRef, useState } from "react";
import { bgColorCardsDashBoard, bgColorTopSellers, bgComponents, bordasComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor, textFieldStyle } from "../../../theme/theme";
import { cellStyle,  cellStyleWhite } from "../../../theme/cellTable";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import { formatDateTime, formatDateToISODate, maskCurrency } from "../../../shared/MaskUtils";
import { SummaryCard } from "./components/SummaryCardComponent";
import { movimentacoesWalletMock, optionsPeriodoMovWallet, FluxoSummaryCardMock, typeOfCategoryList, typeOfReceberList } from "./mocks/WalletMocks";
import { BaseSelect } from "./components/SizedSelect";
import { getStatusNeonBgColor, getStatusNeonFontStyle } from "./helpers/WallletHelpers";
import { useResponsive } from "../../../shared/useResponsive";
import { fetchDashBoardRegistroResumo, fetchDashBoardResumo } from "./repository/WalletRepository";
import type { DashBoardResumo, DashBoardResumoRegistro } from "./entity/WalletEntity";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";



export function MovimentacaoWalletTab() {
const { isMobile } = useResponsive();
const [openClientModal, setOpenClientModal] = useState(false);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const [page, setPage] = useState(0);
const rowsPerPage = 10;
const [contas, setContas] = useState<DashBoardResumoRegistro[]>([]);
const [dashboard, setDashBoard] = useState<DashBoardResumo | null>(null); 
const [typeOfMov, setTypeOfMov] = useState<string>("Todos");  
const [selectStatus, setSelectStatus] = useState<string>("Todos");
const [data_inicio, setDataInicio] = useState<string | null>(null);
const [data_fim, setDataFim] = useState<string | null>(null);
const hoje = new Date();

const jaCarregouRefTypeOfStatus = useRef(false);
const totalPages = Math.ceil(contas.length / rowsPerPage);
const movimentacoesPaginados = contas.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);







    const debounceSearch =async () => {
    if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async() => {
    const value = searchRef.current.trim();

    if ( value !=='' && value.length < 3) return;

   await  fetchDashBoardRegistro();
    }, 1000);
    };

    
    const fetchDashBoard = async(data_inicio: string, data_fim: string) => {
      try {
        setLoading(true);
        const result = await fetchDashBoardResumo(data_inicio, data_fim);
        if (!result?.success) {
          setToastMsg(result.message??"Erro. Contate o administrador");
          setToastType("error");
          setToastOpen(true);
          return;
        }
        setDashBoard(result.data);
      } catch (error) {
           setToastMsg("Erro. Contate o administrador");
          setToastType("error");
          setToastOpen(true);
      } finally {
            setLoading(false);
      }
    };

const fetchDashBoardRegistro = async () => {
  try {
    setLoading(true);

    const receita = typeOfMov === "Todos" ? null : typeOfMov;
    const status = selectStatus === "Todos" ? null : selectStatus;
    if (data_inicio ===null) return;
    if (data_fim ===null) return;
    const result = await fetchDashBoardRegistroResumo(
      data_inicio,
      data_fim,
      receita,
      status,
      searchRef.current
    );

    if (!result?.success) {
      setToastMsg(result.message ?? "Erro. Contate o administrador");
      setToastType("error");
      setToastOpen(true);
      return;
    }

    setContas(result.data);
  } catch {
    setToastMsg("Erro. Contate o administrador");
    setToastType("error");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
const hoje = dayjs();


setDataInicio(hoje.startOf("month").format("YYYY-MM-DD"));
setDataFim(hoje.endOf("month").format("YYYY-MM-DD"));
}, []);


useEffect(() => {
// evita chamada se datas ainda não estão prontas
if (!data_inicio || !data_fim) return;


fetchDashBoardRegistro();
fetchDashBoard(data_inicio, data_fim);
}, [
data_inicio,
data_fim,
typeOfMov,
selectStatus,
]);




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
    
    <Stack display={"flex"} flexDirection={{ xs: "column", sm: "row" }} flexWrap={"wrap"} flexGrow={1} gap={2} sx={{ mr: { xs: 1, md: 2 } }} mb={4}>
      <SummaryCard
      title={'Total Entradas'}
      value={maskCurrency(dashboard?.total_entrada ?? 0)}
      subtitle= {'Valor bruto'} 
      valueColor={colorPositive }
      borderStyle={bordasComponents}
      icon={ <TrendingUp color={colorPositive} />}
      />
      <SummaryCard
      title={'Total Saídas'}
      value={maskCurrency(dashboard?.total_saida ?? 0)}
      subtitle= {'Valor bruto'} 
      valueColor={colorNegative }
      borderStyle={bordasComponents}
      icon={ <TrendingDown color={colorNegative} />}
      />
      <SummaryCard
      title={'Saldo Liquído'}
      value={maskCurrency(dashboard?.saldo ?? 0)}
      subtitle= {'Saldo disponível'} 
      valueColor={primaryColor }
      borderStyle={bordasComponents}
      icon={ <DollarSign color={primaryColor} />}
      />
    </Stack>
    <Box display={"flex"} flexDirection={"column"} flexGrow={1} sx={{ ml: { xs: 0, md: 2 } }}>
        <Stack display={"flex"} flexDirection={"row"} gap={1} alignContent={"center"} alignItems={"center"}>
            <Funnel/>
            <Typography fontWeight={600} display={"flex"} color={"white"} fontSize={"1.6rem"}>
                Filtros
            </Typography>
        </Stack>
    <Stack display={"flex"} flexDirection={{ xs: "column", md: "row" }} flexWrap={"wrap"} gap={2} sx={{ mr: { xs: 1, md: 2 } }} mt={2} alignContent={"center"} alignItems={"center"}>
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
    <Box flex={1}></Box>
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
<BaseSelect
  value={selectStatus}
  height={45}
  sx={{
    flex:1
  }}
  onChange={(e) => {
    setSelectStatus(e.target.value);
  }}
  options={typeOfReceberList.map((status) => ({
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
<LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
format="DD/MM/YYYY"
label="Data início"
maxDate={dayjs(new Date)}
value={data_inicio ? dayjs(data_inicio) : null}
onChange={(date) => {
setDataInicio(date ? date.format("YYYY-MM-DD") : null);

}}
slotProps={{
    textField: {
      size:"small",
      sx:{
        backgroundColor: bgColorTopSellers,
        borderRadius: 1,
        transition: "0.3s ease",
        flex:1,
        "&:hover": {
          boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
        },

        "& .MuiOutlinedInput-root": {
          backgroundColor: bgColorTopSellers,
          color: "#fff",
        },

        "& .MuiOutlinedInput-notchedOutline": {
          border: bordasComponents,
        },

        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${primaryColor}`,
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${primaryColor}`,
          boxShadow: "0 0 0 3px rgba(245,159,10,0.25)",
        },

        "& .MuiSelect-select": {
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          fontSize: 14,
          color: "#fff",
        },

        "& .MuiSvgIcon-root": {
          color: colorOpacity,
        },

        "&.Mui-disabled .MuiSelect-select": {
          color: colorOpacity,
          WebkitTextFillColor: colorOpacity,
        },

        "& .MuiFormHelperText-root": {
          color: colorOpacity,
        },
      }
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
          color: "#FFFF",
          fontWeight: 900,
        },
          "& label": {
          color: "#fff",
        },
      },
    },
  }}
/>

</LocalizationProvider>
<LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
format="DD/MM/YYYY"
label="Data final"
value={data_fim ? dayjs(data_fim) : null}
onChange={(date) => {
setDataFim(date ? date.format("YYYY-MM-DD") : null);
}}
slotProps={{
    textField: {
      size:"small",
      sx:{
        backgroundColor: bgColorTopSellers,
        borderRadius: 1,
        transition: "0.3s ease",

        "&:hover": {
          boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
          borderColor: "rgba(40, 61, 107, 0.9)",
        },

        "& .MuiOutlinedInput-root": {
          backgroundColor: bgColorTopSellers,
          color: "#fff",
        },

        "& .MuiOutlinedInput-notchedOutline": {
          border: bordasComponents,
        },

        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${primaryColor}`,
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${primaryColor}`,
          boxShadow: "0 0 0 3px rgba(245,159,10,0.25)",
        },

        "& .MuiSelect-select": {
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          fontSize: 14,
          color: "#fff",
        },

        "& .MuiSvgIcon-root": {
          color: colorOpacity,
        },

        "&.Mui-disabled .MuiSelect-select": {
          color: colorOpacity,
          WebkitTextFillColor: colorOpacity,
        },

        "& .MuiFormHelperText-root": {
          color: colorOpacity,
        },
      }
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
          color: "#FFFF",
          fontWeight: 900,
        },
          "& label": {
          color: "#fff",
        },
      },
    },
  }}
/>

</LocalizationProvider>
    </Stack>
    </Box>
    <Box flexDirection={"column"} >
    <Box display={"flex"} flexDirection={"column"} flexGrow={1} sx={{ ml: { xs: 0, md: 2 } }}>
    {/* Tabela */}
    <Box sx={{ mr: { xs: 1, md: 2 } }} flexGrow={1}>
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
    {!loading && contas.length === 0 && (
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
    {!loading && contas.length > 0 && (
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
    fontWeight: "bold",
    color: "white",
    bgcolor: row.cor
    }}
    >
    {row.nome}
    </Box>
    </TableCell>
    <TableCell sx={cellStyleWhite}>{row.origem_tipo}</TableCell>
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
    color:  getStatusNeonFontStyle(new Date(row.data_vencimento) < new Date()?'Vencido': row.status!),
    bgcolor:getStatusNeonBgColor(new Date(row.data_vencimento) < new Date() ?'Vencido':row.status!),
    }}
    >
   { new Date(row.data_vencimento) < new Date() ?'Vencido':row.status}
    </Box>
    </TableCell>
    <TableCell sx={{fontSize:"0.85rem",fontWeight:600, color: getStatusNeonFontStyle(row.status) ,borderBottom: "1px solid rgba(40, 61, 107, 0.25)",}}>{maskCurrency(row.valor_total)}</TableCell>
    </TableRow>
    ))}
    </TableBody>
    </Table>
    </TableContainer>
    )}
    {!loading && contas.length > rowsPerPage && (
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