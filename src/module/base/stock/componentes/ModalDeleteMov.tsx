
import {
    Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { ModalViewMovimentationEntity, MovimetDetails } from "../entity/StockEntity";
import { bgColorCardsDashBoard, colorNegative, colorOpacity, colorPositive, hoverGlow, hoverPrimary, primaryColor } from "../../../../theme/theme";
import { FileInput, X } from "lucide-react";
import { cellStyle, cellStyleBold } from "../../../../theme/cellTable";
import { maskCurrency } from "../../../../shared/MaskUtils";
import { useState } from "react";
import { deleteMov } from "../repository/StockRepository";




interface ModalViewDeleteMovPropos {
  open: boolean;
  onClose: () => void;
  movId?: number | null;
  onSuccess: () => Promise<void>;
}


export function ModalDeleteMovById({
  open,
  onClose,
  movId,
  onSuccess,
}: ModalViewDeleteMovPropos) {
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const [isLoading, setLoading] = useState<boolean>(false);
  

const onSubmit = async () => {
  setLoading(true);
  try {
    const result = await deleteMov(movId!);
    if (!result?.success) {
      setToastType("error");
      setToastMsg(result?.message ?? "Erro ao deletar movimentação.");
      setToastOpen(true);
      return;
    }
    await onSuccess();
    onClose();
  } catch (error) {
    setToastType("error");
    setToastMsg("Erro ao deletar movimentação.");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};


return (
        <>
    {/* TOAST */}
<Snackbar
    open={toastOpen}
    autoHideDuration={2000}
    onClose={() => setToastOpen(false)}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
    <Alert severity={toastType} sx={{ width: "100%" }}>
    {toastMsg}
    </Alert>
</Snackbar>
<Modal open={open} onClose={onClose}>
    <Box
    display="flex"
    flexDirection="column"
    sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "95vw", sm: "90vw", md: 720 },
        maxHeight: "90vh",
        overflowY: "auto",
        bgcolor: bgColorCardsDashBoard,
        borderRadius: 2,
        gap:0,
        border: "1px solid rgba(40, 61, 107, 0.4)",
        pl: 4,
        pr:4,
        pt:2,
        pb:2,
    }}
    >
<Stack direction="row" justifyContent="flex-end">
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
<Typography fontWeight={600} fontSize={"1.4rem"} display={"flex"} color={"#FFFF"}>
    Confirmar exclusão
</Typography>
<Typography fontWeight={400} fontSize={"1rem"} display={"flex"} color={colorOpacity}>
    Tem certeza que deseja excluir esta movimentação? Esta ação não pode ser desfeita.
</Typography>
     {/* AÇÕES */}
<Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
<Button
    variant="outlined"
    disabled={isLoading}
    onClick={onClose}
    sx={{
    color: colorOpacity,
    border: "1px solid rgba(40, 61, 107, 0.6)",
    width:150
    }}
>
    Cancelar
</Button>

<Button
    disabled={isLoading}
    onClick={async ()=> await onSubmit()}
    sx={{
    width:200,
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
    px: 3,}}>
{isLoading ? (
<CircularProgress size={26} />
) : "Confirmar"}
</Button>
</Stack>
    </Box>
</Modal>
     </>
  );
}

