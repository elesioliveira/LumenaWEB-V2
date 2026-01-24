
  import {  ChevronLeft, ChevronRight, Funnel, Plus, TrendingUp, } from "lucide-react";
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
import { bgColorCardsDashBoard, bgColorTopSellers, bgComponents, bordasComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor } from "../../../theme/theme";
import { cellStyle,  cellStyleWhite } from "../../../theme/cellTable";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
import type { NovaContaDTO,  SummaryCardDTO } from "./dto/WalletDTO";
import {  maskCurrency } from "../../../shared/MaskUtils";
import { SummaryCard } from "./components/SummaryCardComponent";
import {  contaReceberSummaryCardMock, typeOfReceberList } from "./mocks/WalletMocks";
import { BaseSelect } from "./components/SizedSelect";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";
import { getStatusNeonBgColor, getStatusNeonFontStyle } from "./helpers/WallletHelpers";
import { TableActionsMenuContaReceber } from "./components/TableActionsMenuContaReceber";
import { CreateOrUpdateContaReceberModal } from "./components/ModalContaReceber";
import type { ContaReceberEntity, DashbBoarWallet } from "./entity/WalletEntity";
import { fetchContasWallet, fetchDashBoardWallet, putSubmitUpdateConta } from "./repository/WalletRepository";
import { VisualizarContaDialog } from "./components/VisualizarContaDialog";



export function ContasReceberTab() {
const [openClientModal, setOpenClientModal] = useState(false);
const [visualizarConta, setVisualizarConta] = useState(false);
const [contaSelecionada, setContaSelecionada] = useState<ContaReceberEntity | null>(null);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchByDescricao = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const rowsPerPage = 10;
const [contas, setContas] = useState<ContaReceberEntity[]>([]);
const [dashBoard, setDashBoard] =useState<DashbBoarWallet | null>(null);
const [typeOfPayment, setTypeOfPayment] = useState<string>("Todos");

const jaCarregouRefTypeOfStatus = useRef(false);
const totalPages = Math.ceil(contas.length / rowsPerPage);
const contasPaginadas = contas.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);


const handleContaSelecionada = (conta: ContaReceberEntity |null, openModal: boolean) => {
  setContaSelecionada(conta);
  setOpenClientModal(openModal);
};


    const fetchContas = async () => {
    setLoading(true);
      try {
          const response = await fetchContasWallet(searchByDescricao.current?.trim(), typeOfPayment ==="Todos"? null : typeOfPayment, 'Receita');
        if (!response?.success) {
          setToastType("error");
          setToastMsg(response?.message ?? "Erro ao encontrar suas contas.");
          setToastOpen(true);
          return;
        }
        if (response?.success) {
          setContas(response.data);
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
    const value = searchByDescricao.current.trim();

    if ( value !=='' && value.length < 3) return;

     await  fetchContas();
    }, 1000);
    };

const handleMarcarComoRecebido = async (row: ContaReceberEntity) => {
  if (row.status ==="Recebido")return;
  try {
    setLoading(true);
    const payload: NovaContaDTO = {
      descricao: row.descricao,
      categoria_id: row.categoria_id,
      cliente_id: row.cliente_id,
      data_vencimento: row.vencimento,
      fornecedor_id: row.fornecedor_id,
      observacao: row.observacao,
      origem_tipo: row.origem_tipo,
      status: "Recebido",
      tipo_pagamento: row.tipo_pagamento,
      valor_total: row.valor
    };
    const result = await putSubmitUpdateConta(payload, row.id);
    if (!result.success) {
      setToastMsg(result.message ?? "Error. Contate o administrador.");
      setToastType("error");
      setToastOpen(true);
      return;
    }
    await fetchContas();
  } catch (error) {
        setToastMsg( "Error. Contate o administrador.");
      setToastType("error");
      setToastOpen(true);
  } finally {
    setLoading(false);
  }
};


const fetchDashBoard = async () => {
  try {
    const result = await fetchDashBoardWallet("Conta a Receber");
      if (!result.success) {
      setToastMsg(result.message ?? "Error. Contate o administrador.");
      setToastType("error");
      setToastOpen(true);
      return;
    }
    setDashBoard(result.data);
  } catch (error) {
        setToastMsg( "Error. Contate o administrador.");
      setToastType("error");
      setToastOpen(true);
  } finally {
    setLoading(false);
  }
};


    useEffect(() => {
    if (jaCarregouRef.current) return;
    jaCarregouRef.current = true;
    const preLoad = async () => {
      setLoading(true);
    await fetchDashBoard();
    await fetchContas();
    setLoading(false);
    };
    preLoad();
    }, []);

    useEffect(() => {
    if (!jaCarregouRefTypeOfStatus.current) return;
      fetchContas();
    }, [typeOfPayment]);


const handleVisualizarConta = (row: ContaReceberEntity) => {
  setContaSelecionada(row);
  setVisualizarConta(true);
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
    <VisualizarContaDialog conta={contaSelecionada} open={visualizarConta} onClose={()=> {
      setVisualizarConta(false);
      setContaSelecionada(null);
    }}/>
    <CreateOrUpdateContaReceberModal
    open={openClientModal}
    onClose={() => handleContaSelecionada(null, false)}
    onSuccess={async() => {
      handleContaSelecionada(null, false);
      await fetchContas();
    }}
    conta={contaSelecionada}
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
          A Receber
        </Typography>
        <TrendingUp color={colorPositive}/>
      </Stack>

      <Typography fontWeight={600} color={colorPositive} fontSize="1.6rem">
        {dashBoard!== null? maskCurrency(dashBoard?.total_aberto) : 0}
      </Typography>

      <Typography fontWeight={200} color={colorOpacity} fontSize="1.2rem">
       {dashBoard?.qtd_aberto} contas pendentes
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
          Contas Vencidas
        </Typography>
        <TrendingUp color={colorNegative}/>
      </Stack>

      <Typography fontWeight={600} color={colorNegative} fontSize="1.6rem">
        {dashBoard!== null? maskCurrency(dashBoard?.total_vencido) : 0}
      </Typography>
      <Typography fontWeight={200} color={colorOpacity} fontSize="1.2rem">
        {dashBoard?.qtd_vencido} contas vencidas
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
    placeholder="Buscar contas..."
    variant="outlined"
    type="text"
    size="medium"
    onChange={(e) => {
    searchByDescricao.current = e.target.value;
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
      onChange={  (e) => {
        jaCarregouRefTypeOfStatus.current = true;
        setTypeOfPayment(e.target.value);
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
    onClick={async() => handleContaSelecionada(null, true)}
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
    Carregando contas...
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
    {["Descrição", "Cliente", "Categoria", "Vencimento", "Status", "Valor"].map(
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
    <TableCell sx={cellStyleWhite}>{row.descricao}</TableCell>
    <TableCell sx={cellStyleWhite}>{row.cliente}</TableCell>
    <TableCell sx={cellStyleWhite}>{row.categoria}</TableCell>
    <TableCell sx={cellStyleWhite}>{row.vencimento}</TableCell>
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
    color:  getStatusNeonFontStyle(new Date(row.vencimento) < new Date()?'Vencido': row.status!),
    bgcolor:getStatusNeonBgColor(new Date(row.vencimento) < new Date() ?'Vencido':row.status!),
    }}
    >
    { new Date(row.vencimento) < new Date() ?'Vencido':row.status}
    </Box>
    </TableCell>
    <TableCell sx={cellStyleWhite}  align="left">
      <Stack display={"flex"} flexDirection={"row"} gap={1}  alignItems={"center"} alignContent={"start"}  justifyContent={"start"} justifyItems={"start"} >
      <Box flex={1} color={colorPositive}>{maskCurrency(row.valor??0)}</Box>
      <Box flex={1}>
        <TableActionsMenuContaReceber
        handleEditarConta={() => {handleContaSelecionada(row, true)}}
        handleActionMarcarComoRecebido={async () => {
         await  handleMarcarComoRecebido(row);
        }}
        rowId={row.id} handleActionVisualizar={() => {
          handleVisualizarConta(row);
        }}/>
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