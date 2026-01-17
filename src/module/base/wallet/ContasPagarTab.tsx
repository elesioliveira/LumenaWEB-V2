
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
import type { ContaPagarDTO, MovimentacaoWalletDTO, SummaryCardDTO } from "./dto/WalletDTO";
import { formatDateTime, maskCurrency } from "../../../shared/MaskUtils";
import { SummaryCard } from "./components/SummaryCardComponent";
import { movimentacoesWalletMock, optionsPeriodoMovWallet, optionsStatusMovWallte, FluxoSummaryCardMock, typeOfMovimenttion, contaPagarSummaryCardMock, typeOfPaymentList, contasPagarMock } from "./mocks/WalletMocks";
import { BaseSelect } from "./components/SizedSelect";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";
import { getStatusNeonBgColor, getStatusNeonFontStyle } from "./helpers/WallletHelpers";
import { TableActionsMenuContaPagar } from "./components/TableActionsMenuContaPagar";
import { ModalContaPagarView } from "./components/ModalContaPagarView";



export function ContasPagarTab() {
const [openModalView, setOpenModalView] = useState(false);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const rowsPerPage = 10;
const [contas, setContas] = useState<ContaPagarDTO[]>(contasPagarMock);
const [summaryCard, setSummary] = useState<SummaryCardDTO[]>(contaPagarSummaryCardMock);
const [typeOfPayment, setTypeOfPayment] = useState<string>("Todos");
const [selectStatus, setSelectStatus] = useState<string>("Todos Status");
const [selectPeriodo, setSelectPeriodo] = useState<string>("Este mês");
const [modalViewIdSelect, setModalViewIdSelect] =useState<number | null>(null);
const jaCarregouRefTypeOfStatus = useRef(false);
const totalPages = Math.ceil(contas.length / rowsPerPage);
const contasPaginadas = contas.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);

const handleOpenModalView = (id: number) => {
  setModalViewIdSelect(id);
};

const handleCloseModalView = () => {
  setModalViewIdSelect(null);
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
    
    <ModalContaPagarView
     open={modalViewIdSelect !== null}
    id={modalViewIdSelect}
    onClose={() => {
    handleCloseModalView();
    }}  //  recarrega lista
    />
    <Stack display={"flex"} flexDirection={"row"} flexGrow={1} gap={2} mr={2} mb={4}>
    {summaryCard.length >0 && (
    summaryCard.map((i, index) => 
    <SummaryCard
     key={index}
    title={i.title}
    value={maskCurrency(i.valor)}
    subtitle= { i.descricao} 
    valueColor={i.descricao.toLowerCase().includes("vencidas") ? colorNegative: primaryColor}
    borderStyle={bordasComponents}
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
    <Stack display={"flex"}  flexGrow={1} flexDirection={"row"} gap={2} mr={4} mt={2} alignContent={"center"} alignItems={"start"} justifyContent={"space-between"}>
    <Stack display={"flex"} flexDirection={"row"}gap={2}  alignContent={"center"} alignItems={"start"}>
    <TextField
    placeholder="Buscar contas..."
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
      value={typeOfPayment}
      height={45}
      sx={{
        width:200
      }}
      onChange={(e) => {
        jaCarregouRefTypeOfStatus.current = true;
        setTypeOfPayment(e.target.value);
      }}
      options={typeOfPaymentList.map((status) => ({
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
    label="Nova Conta"
    boxShadow="0 0 20px rgba(245,159,10,0.35)"
    background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
    startIcon={<Plus />}
    sx={{
      width:200,
      height:50,
    }}
    onClick={async() => {
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
    {["Descrição", "Fornecedor", "Categoria", "Vencimento", "Status", "Valor"].map(
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
    {contasPaginadas.map((row, index) => (
      

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
    <TableCell sx={cellStyleWhite}>{row.descricao }</TableCell>
    <TableCell sx={cellStyleWhite}>{row.fornecedor}</TableCell>
    <TableCell sx={cellStyleWhite}>{row.categoria}</TableCell>
    <TableCell sx={cellStyleWhite}>{formatDateTime(row.vencimento)}</TableCell>
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
    color: getStatusNeonFontStyle(row.status!),
    bgcolor:getStatusNeonBgColor(row.status!),
    }}
    >
    {row.status}
    </Box>
    </TableCell>
    <TableCell sx={cellStyleWhite} align="left">
      <Stack direction="row" gap={1} alignItems="center">
        <Box flex={1}>{maskCurrency(row.valor ?? 0)}</Box>

        <Box>
          <TableActionsMenuContaPagar
            rowId={row.id}
            onView={handleOpenModalView}
          />
        </Box>
      </Stack>
    </TableCell>
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