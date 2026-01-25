
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { bgColorCardsDashBoard,  colorNegative, colorOpacity, colorPositive } from "../../../../theme/theme";
import { X } from "lucide-react";
import type { ContaReceberEntity } from "../entity/WalletEntity";
import { maskCurrency } from "../../../../shared/MaskUtils";
import { getStatusNeonFontStyle } from "../helpers/WallletHelpers";



interface VisualizarContaDialog {
  open: boolean;
  onClose: () => void;
  conta: ContaReceberEntity | null;
}

export function VisualizarContaDialog({
  open,
  onClose,
  conta
}: VisualizarContaDialog) {



return (
    <>
<Dialog
  open={open}
  onClose={() => onClose}
  fullWidth
  maxWidth="md"
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
    Detalhes da Conta

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
    <Box display={"grid"}  gridTemplateColumns="repeat(2, 1fr)" gap={3}  width={"100%"} minHeight={0} minWidth={0}>
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" color={colorOpacity}>Descrição</Typography>
            <Typography fontSize={"1.1rem"} fontWeight={500} color={"white"}>{conta?.descricao}</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" color={colorOpacity}>{conta?.fornecedor!==null? "Fornecedor"  :"Cliente"}</Typography>
            <Typography fontSize={"1.1rem"} fontWeight={500} color={"white"}>{conta?.fornecedor!==null? conta?.fornecedor : conta.cliente}</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" color={colorOpacity}>Categoria</Typography>
            <Typography fontSize={"1.1rem"} fontWeight={500} color={"white"}>{conta?.categoria}</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" color={colorOpacity}>Valor</Typography>
            <Typography fontSize={"1.3rem"} fontWeight={500} color={colorPositive}>{maskCurrency(conta?.valor??0)}</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" color={colorOpacity}>Vencimento</Typography>
            <Typography fontSize={"1.3rem"} fontWeight={500} color={"white"}>{conta?.vencimento}</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" color={colorOpacity}>Status</Typography>
            <Typography fontSize={"1.3rem"} fontWeight={500} color={conta === null? "": getStatusNeonFontStyle(new Date(conta.vencimento) < new Date()?'Vencido': conta?.status!)}>{ conta === null? "": new Date(conta.vencimento) < new Date()?'Vencido':conta?.status}</Typography>
        </Box>
    </Box>
  </DialogContent>

</Dialog>

    </>
);
}
