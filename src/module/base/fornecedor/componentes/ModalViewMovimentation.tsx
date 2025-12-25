
import {
  Box,
  Modal,
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




interface ModalViewMovimentationProps {
  open: boolean;
  onClose: () => void;
  data?: MovimetDetails | null;
}


export function ModalViewMovimentation({
  open,
  onClose,
  data,
}: ModalViewMovimentationProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 820,
          bgcolor: bgColorCardsDashBoard,
          borderRadius: 2,
          gap:0,
          border: "1px solid rgba(40, 61, 107, 0.4)",
          pl: 4,
          pr:4,
          pt:4
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
<Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-start"} gap={1} justifyItems={"center"}>
          <FileInput size={30} color={data?.tipo.toUpperCase() ==="ENTRADA"? colorPositive : colorNegative}/>
          <Typography
          fontSize="1.5rem"
          fontWeight={400}
          color="#fff"
          mb={2}>
          Entrada de Nota - NF-{data?.nota ?? "--"}
        </Typography>
</Stack>
          <Typography
          fontSize="1rem"
          fontWeight={400}
          color={colorOpacity}
          mb={2}>
         Detalhes da movimentação de estoque
        </Typography>
       <Box display={"flex"} flexDirection={"column"} flexGrow={1}>
          <Stack display={"flex"} flexDirection={"row"} flexGrow={1} justifyContent={"space-between"}>
          <Box display={"flex"} flexDirection={"column"} flex={1}>
            <Typography color={colorOpacity} fontWeight={400} fontSize={"1rem"}>
            Fornecedor
            </Typography>
            <Typography color={"#ffff"} fontWeight={500} fontSize={"1.2rem"}>
            Distribuidora ABC
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} flex={1}>
            <Typography color={colorOpacity} fontWeight={400} fontSize={"1rem"}>
            Data de Emissão
            </Typography>
            <Typography color={"#ffff"} fontWeight={400} fontSize={"1.2rem"}>
            24/12/2025, 10:45
            </Typography>
          </Box>
        </Stack>
          <Box display={"flex"} flexDirection={"column"} flex={1} mt={2}>
            <Typography color={colorOpacity} fontWeight={400} fontSize={"1rem"}>
           Observação
            </Typography>
            <Typography color={"#ffff"} fontWeight={400} fontSize={"1.2rem"}>
            Primeira compra do mês
            </Typography>
          </Box>
      <Typography color={colorOpacity} fontWeight={400} fontSize={"1.2rem"} mt={4}>
      Itens
      </Typography>
      <TableContainer sx={{ maxHeight: "450px",  mt:0}}>
      <Table
        stickyHeader//se tirar some o header da table
        aria-label="Pedidos Recentes"
        sx={{
          mt: 2,
          bgcolor: "transparent",
          borderCollapse: "separate",
          borderSpacing: "0 8px", // espaço entre linhas (opcional)
        }}
      >
        {/* HEADER */}
        <TableHead>
          <TableRow>
            {["Produto", "Qtd", "Valor Unit.", "Subtotal"].map(
              (col) => (
                <TableCell
                  key={col}
                  sx={{
                    backgroundColor: "transparent", //  remove fundo
                    color: colorOpacity,
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
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
          {data?.itens.map((row) => (
            <TableRow
              key={row.produto}
              sx={{
                backgroundColor: "rgba(255,255,255,0.02)",
                transition: "0.25s ease",

                "&:hover": {
                    transition: "all 0.25s ease",
        ...hoverGlow,
                },
              }}
            >
              <TableCell sx={cellStyleBold}>{row.produto}</TableCell>
              <TableCell sx={cellStyle}>{row.quantidade}</TableCell>
              <TableCell sx={cellStyleBold}>{maskCurrency(row.valor_unitario)}</TableCell>
              <TableCell sx={cellStyleBold}>{maskCurrency(row.sub_total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack display={"flex"} flexDirection={"row"} flexGrow={1} justifyContent={"flex-end"} mt={4}>
      <Box display={"flex"} flexDirection={"column"}>
        <Typography color={colorOpacity} fontWeight={300} fontSize={"1.3rem"}>
          Valor Total
        </Typography>
<Typography
  fontWeight="bold"
  fontSize="1.5rem"
  sx={{
    background: "linear-gradient(90deg, #f7a41c, #f97316)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  {maskCurrency(data?.valor_total?? 0)}
</Typography>
      </Box>
    </Stack>
      </Box>
      </Box>
    </Modal>
  );
}

