
  import {  Ban, Building2, ChevronLeft, ChevronRight, Eye,  Funnel,  Mail,  MapPin,  Pencil, Plus, Save, Shield, ShoppingCart, UserCheck, UserRoundX, Users2, } from "lucide-react";
  import {
  Box,
  Typography,
  Stack,
  Snackbar,
  Alert,
  MenuItem,
   useMediaQuery,
   useTheme,
   TextField,
   CircularProgress,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
  } from "@mui/material";
  import { useEffect, useRef, useState } from "react";
import { bgColorCardsDashBoard, bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, bordasComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor, textFieldStyle } from "../../../../theme/theme";
import { PrimaryActionButton } from "../../../../shared/PrimaryActionButtonProps";
import { InfoCard } from "../components/InfoCard";
import { BaseSelect } from "../../wallet/components/SizedSelect";
import { typeOfCategoryList } from "../../wallet/mocks/WalletMocks";
import { cellStyle, cellStyleWhite } from "../../../../theme/cellTable";
import type { User } from "../entities/UsersEntity";
import { perfilUser, perfilUserTab, statusTab, usersMock } from "../mock/CompanyMocks";
import { getStatusNeonBgColor, getStatusNeonFontStyle } from "../../wallet/helpers/WallletHelpers";
import { TableActionsMenuContaPagar } from "../../wallet/components/TableActionsMenuContaPagar";
import { PaginationButton } from "../../produto/fornecedor/components/PaginationButton";
import { DialogUser } from "../components/DialogCreateOrUpdateUser";
import { fetchUser } from "../repository/CompanyRepository";
import { preload } from "react-dom";
import { formatDateTime } from "../../../../shared/MaskUtils";







export function UsersTab() {
const [dialogUserOpen, setDialog] =useState(false);
const [userSelected, setUser] = useState<User | null>(null);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const theme = useTheme(); // obrigatório
const isMobile = useMediaQuery(theme.breakpoints.down("md"));
const [users, setUsers] = useState<User[]>(usersMock);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRefTypeOfStatus = useRef(false);
const jaCarregou = useRef(false);
const [perfil, setPerfil] = useState<string>("Todos");
const [status, setStatus] = useState<string>("Todos");
const [page, setPage] = useState(0);
const rowsPerPage = 10;
const totalPages = Math.ceil(users.length / rowsPerPage);
const contasPaginadas = users.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);

//====METODOS
    const debounceSearch =async () => {
    if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async() => {
    const value = searchRef.current.trim();

    if ( value !=='' && value.length < 3) return;

  await  fetchUsers();
    }, 1000);
    };



//====APIS
const fetchUsers = async ()=> {
try {
    const perfilApi = perfil ==="Todos"? null : perfil;
    const statusApi = status === "Todos"? null : status === "Ativo";
    setLoading(true);
    const result = await fetchUser(searchRef.current, perfilApi, statusApi);
    if (!result?.success) {
        setToastMsg(result.message ?? "Erro. Contate o administrador.");
        setToastType("error");
        setToastOpen(true);
        return;
    }
    setUsers(result.data);
} catch (error) {
                setToastMsg( "Erro. Contate o administrador.");
            setToastType("error");
            setToastOpen(true);
    } finally {
        setLoading(false);
}
};

useEffect(()=>{
    const preLoad = async ()=> {
        await fetchUsers();
    };
    preLoad();
},[ perfil, status]);


    return (
    <>
    <DialogUser
    open={dialogUserOpen}
    user={userSelected}
    onClose={() => {
    setDialog(false);
    setUser(null);
    }}
    onSuccess={async() => {
        //buscar users novamente
    setDialog(false);
    setUser(null);
    }}   //  recarrega lista
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
    <Box flexDirection={"column"} mr={2}>
    <Box display={"flex"} flexDirection={"column"} flexGrow={2} ml={2}>
    <Box display={"flex"} flexDirection={"column"}>
      <Stack display={"flex"} flexDirection={"row"} width={"100%"} minHeight={0} alignContent={"center"} justifyContent={"space-between"}>
        <Box display={"flex"} flexDirection={"column"}>
              <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
              Usuários e Permissões
              </Typography>
              <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
              Gerencie os usuários e seus níveis de acesso
              </Typography>
        </Box>
        <PrimaryActionButton
          label="Novo Usuário"
          type="button"
          boxShadow="0 0 20px rgba(245,159,10,0.35)"
          background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
          startIcon={<Plus />}
          sx={{
          width: "200px",
          height: 50,
          mt: "auto",
          }}
        onClick={() => setDialog(true)}
        />
      </Stack>
    </Box>
                 <Stack display={"flex"} flexDirection={"row"} flexGrow={1} gap={2} mr={2} mb={3} mt={4}>
                   <InfoCard
                    title="Total de Usuários"
                    value={5}
                    icon={<Users2 color={primaryColor} size={38} />}
                    />
                   <InfoCard
                    title="Usuários Ativos"
                    value={4}
                    icon={<UserCheck color={colorPositive} size={38} />}
                    />
                   <InfoCard
                    title="Usuários Inativos"
                    value={5}
                    icon={<UserRoundX color={colorOpacity} size={38} />}
                    />
                   <InfoCard
                    title="Administradores"
                    value={1}
                    icon={<Shield color={colorNegative} size={38} />}
                    />
                </Stack>
    <Stack display={"flex"} flexDirection={"row"} width={"100%"} minHeight={0} gap={2} alignContent={"flex-start"} alignItems={"end"}>
        <Box display={"flex"} flexDirection={"column"} minHeight={0} minWidth={500} gap={0.5}>
        <Stack display={"flex"} flexDirection={"row"} gap={1} alignContent={"center"} alignItems={"center"}>
        <Funnel/>
        <Typography fontWeight={600} display={"flex"} color={"white"} fontSize={"1.6rem"}>
        Filtros
        </Typography>
        </Stack>
        <TextField
        placeholder="Buscar usuário..."
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
        </Box>
        <BaseSelect
            value={perfil}
            sx={{width:250, height:45}}
            onChange={(e) => {
            jaCarregouRefTypeOfStatus.current = true;
            setPerfil(e.target.value);
            }}
            options={perfilUserTab.map((status) => ({
            value: status,
            label: status
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
            value={status}
            sx={{width:250, height:45}}
            onChange={(e) => {
            jaCarregouRefTypeOfStatus.current = true;
            setStatus(e.target.value);
            }}
            options={statusTab.map((status) => ({
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
    {loading ? (
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        width="100%"
        >
        <CircularProgress size={48} />
        </Box>
    ) : (
        <Box display={"flex"} flexDirection={"column"} width={"100%"} minHeight={0} mt={0}>
              
                <Typography fontWeight={600} fontSize={"1.7rem"} color={"white"} mt={4}>Lista de Usuários</Typography>
                <Typography fontWeight={300} fontSize={"1.1rem"} color={colorOpacity} mt={0}>{users.length} usuário(s) encontrado(s)</Typography>
                {/* TABELA */}
                {!loading && users.length > 0 && (
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
                {["Nome", "E-mail", "Perfil", "Status", "Último Acesso", "Ações"].map(
                (col) => (
                <TableCell
                key={col}
                align="left"
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
                <TableCell sx={cellStyleWhite}>{row.nome }</TableCell>
                <TableCell sx={cellStyleWhite}>{row.email}</TableCell>
                <TableCell sx={cellStyle} align="left">
                <Box
                sx={{
                maxWidth:100,
                height: 22,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 600,
                pl:5,
                pr:5,
                color: getStatusNeonFontStyle(row.perfil!),
                bgcolor:getStatusNeonBgColor(row.perfil!),
                }}
                >
                {row.perfil}
                </Box>
                </TableCell>
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
                color: row.status ==='Ativo'? colorPositive : colorNegative,
                bgcolor:row.status ==='Ativo'? bgColorPositive : bgColorNegative ,
                }}
                >
                {row.status}
                </Box>
                </TableCell>
                 <TableCell sx={cellStyleWhite}>{formatDateTime(row.ultimo_acesso, true)}</TableCell>
                <TableCell sx={cellStyleWhite} align="left">
                        <TableActionsMenuContaPagar
                        rowId={row.id}
                        onView={()=> {}}
                        handleActionVisualizar={ ()=> {}}
                        handleActionMarcarComoPago={ async()=> {}}
                        handleEditarConta={()=> {}}
                        />
                </TableCell>
                </TableRow>
                ))}
                </TableBody>
                </Table>
                </TableContainer>
                )}
                {!loading && users.length > rowsPerPage && (
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
    )}
    </Box>
    </Box>
    </>
    );
    }