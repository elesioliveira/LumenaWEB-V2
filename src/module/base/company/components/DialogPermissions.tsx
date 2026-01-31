import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Stack,
  Switch,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DescriptionIcon from "@mui/icons-material/Description";
import BarChartIcon from "@mui/icons-material/BarChart";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import { bgColorCardsDashBoard, colorNegative, colorOpacity } from "../../../../theme/theme";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updateRotaUser } from "../repository/CompanyRepository";

interface PermissionItem {
  key: number;
  label: string;
  habilitado: boolean;
  icon: React.ReactNode;
}

const permissions: PermissionItem[] = [
  { key: 0, habilitado:false, label: "Dashboard", icon: <DashboardIcon sx={{color:"#FFF"}} /> },
  { key: 1,habilitado:false, label: "Vendas", icon: <ShoppingCartIcon sx={{color:"#FFF"}} /> },
  { key: 2,habilitado:false, label: "Produtos", icon: <Inventory2Icon sx={{color:"#FFF"}} /> },
  { key: 3,habilitado:false, label: "Clientes", icon: <GroupIcon  sx={{color:"#FFF"}} /> },
  { key: 4,habilitado:false, label: "Financeiro", icon: <AccountBalanceWalletIcon sx={{color:"#FFF"}} /> },
  { key: 5,habilitado:false, label: "Estoque", icon: <LocalShippingIcon sx={{color:"#FFF"}} /> },
  { key: 6,habilitado:false, label: "Relatórios", icon: <DescriptionIcon sx={{color:"#FFF"}} /> },
  { key: 7,habilitado:false, label: "Análise", icon: <BarChartIcon sx={{color:"#FFF"}} /> },
  { key: 8,habilitado:false, label: "Empresa", icon: <BusinessIcon sx={{color:"#FFF"}} /> },
  { key: 9,habilitado:false, label: "Configurações", icon: <SettingsIcon sx={{color:"#FFF"}} /> },
];

interface DialogPermissionsProps {
  open: boolean;
  onClose: () => void;
  id_user: number | null;
  rotas: number[] |null;
  onSuccess: ()=> Promise<void>;
}

export function DialogPermissions({
  open,
  onClose,
  id_user,
  rotas,
  onSuccess,
}: DialogPermissionsProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
 const [permissionsState, setPermissionsState] = useState<PermissionItem[]>(permissions);

//METODOS
const togglePermission = (key: number) => {
  setPermissionsState((prev) =>
    prev.map((perm) =>
      perm.key === key
        ? { ...perm, habilitado: !perm.habilitado }
        : perm
    )
  );
};

//=========API===========

const handleSave = async () => {
  if (!id_user) return;

  setLoading(true);

  const rotasHabilitadas = permissionsState
    .filter((p) => p.habilitado).map((p) => p.key);

  if (rotasHabilitadas.length === 0) {
    setToastMsg("Selecione ao menos uma permissão.");
    setToastType("error");
    setToastOpen(true);
    setLoading(false);
    return;
  }

  try {
    const result = await updateRotaUser(rotasHabilitadas, id_user);

    if (!result.success) {
      setToastMsg(result.message);
      setToastType("error");
      setToastOpen(true);
      return;
    }

    setToastType("success");
    setToastMsg("Permissões atualizadas com sucesso.");
    setToastOpen(true);

    await onSuccess();
    onClose();
  } catch {
    setToastMsg("Erro. Contate o administrador.");
    setToastType("error");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (!open) return;

  setPermissionsState(
    permissions.map((perm) => ({
      ...perm,
      habilitado: rotas?.includes(perm.key) ?? false,
    }))
  );
}, [open, rotas]);

 return (
    <>
    {/* TOAST */}
    <Snackbar
        open={toastOpen}
        autoHideDuration={1000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={toastType} sx={{ width: "100%" }}>
        {toastMsg}
        </Alert>
    </Snackbar>

<Dialog
  open={open}
  onClose={() => {
    onClose();
  }}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      bgcolor: bgColorCardsDashBoard,
      borderRadius: 2,
      border: "1px solid rgba(40, 61, 107, 0.4)",
    },
  }}
>
  {/* HEADER */}
  <DialogTitle
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#fff",
      fontSize: "1.4rem",
      fontWeight: 700,
      px: 4,
      pt: 3,
      pb: 2,
    }}
  >
    <Stack display={"flex"} width={"100%"} minHeight={0} flexDirection={"row"} alignContent={"start"} alignItems={"start"} justifyContent={"space-between"} justifyItems={"start"}>
        <Box display={"flex"} flexDirection={"column"} minHeight={0}>
            <Typography fontWeight={600} fontSize={"1.4rem"} color={"white"}>
            Editar permissão de usuário
            </Typography>
            <Typography fontWeight={300} fontSize={"1rem"} color={colorOpacity}>
            Habilite as rotas desejadas.
            </Typography>
        </Box>
        <Box
        onClick={onClose}
        sx={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            cursor: "pointer",
            color: colorOpacity,
            transition: "all 0.25s ease",
            "&:hover": {
            color: colorNegative,
            backgroundColor: "rgba(255, 80, 80, 0.15)",
            boxShadow: "0 0 12px rgba(255, 80, 80, 0.45)",
            transform: "rotate(90deg) scale(1.05)",
            },
        }}
        >
        <X size={28} />
        </Box>
    </Stack>

  </DialogTitle>

  {/* CONTENT */}
  <DialogContent
    dividers
    sx={{
      px: 4,
      py: 3,
      color: "#fff",
    }}
  >
{permissionsState.map((perm) => (
  <Stack
    key={perm.key}
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    px={3}
    py={1.5}
    sx={{
      borderRadius: 2,
      cursor: "pointer",
      "&:hover": { bgcolor: "action.hover" },
    }}
  >
    <Stack direction="row" alignItems="center" spacing={2}>
      {perm.icon}
      <Typography fontWeight={500}>{perm.label}</Typography>
    </Stack>

    <Switch
      checked={perm.habilitado}               // ✅ controla visual
      onChange={() => togglePermission(perm.key)} // ✅ altera estado
      color="warning"
    />
  </Stack>
))}

  </DialogContent>
  {/* ACTIONS */}
  <DialogActions
    sx={{
      px: 4,
      py: 3,
      borderTop: "1px solid rgba(40, 61, 107, 0.4)",
      bgcolor: bgColorCardsDashBoard,
      gap:2
    }}
  >
    <Button
      variant="outlined"
      onClick={() => {
        onClose();
      }}
      sx={{
        width: 150,
        color: colorOpacity,
        border: "1px solid rgba(40, 61, 107, 0.6)",
      }}
    >
      Cancelar
    </Button>

    <Button
      type="button"
        onClick={ async () => {
            // chamar a api aqui
            await handleSave();
        }}
      disabled={isLoading}
      sx={{
        width: 200,
        background: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
        boxShadow: "0 0 20px rgba(245,159,10,0.35)",
        transition: "0.25s ease",
        "&:hover": {
          background: "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
          boxShadow: "0 0 25px rgba(245,159,10,0.55)",
          transform: "translateY(-1px)",
        },
        color: "#fff",
        fontWeight: 600,
        px: 3,
      }}
    >
      {isLoading ? (
        <CircularProgress size={26} />
      ) : "Salvar"}
    </Button>
  </DialogActions>
</Dialog>

    </>
);
}
