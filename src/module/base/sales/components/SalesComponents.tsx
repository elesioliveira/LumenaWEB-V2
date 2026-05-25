
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
  Typography,
} from "@mui/material";
import { bgColorCardsDashBoard, colorGray, colorNegative, colorOpacity, colorPositive, hoverGlow,} from "../../../../theme/theme";
import {X } from "lucide-react";
import { cellStyle, cellStyleBold } from "../../../../theme/cellTable";
import { formatDateTime, maskCurrency } from "../../../../shared/MaskUtils";
import type { NewSaleDTO } from "../dto/SaleDTO";
import type { SaleDetailsModalEntity } from "../entity/SalesEntity";




interface ModalViewSalesProps {
  open: boolean;
  onClose: () => void;
  data?: SaleDetailsModalEntity | null;
}


export function ModalViewSale({
  open,
  onClose,
  data,
}: ModalViewSalesProps) {
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
          width: { xs: "95vw", sm: "90vw", md: 820 },
          maxHeight: "90vh",
          overflowY: "auto",
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
          <Typography
          fontSize="1.5rem"
          fontWeight={400}
          color="#fff"
          mb={0}>
        Detalhes do Pedido - {data?.ultimo_pedido ?? "--"}
        </Typography>
          <Typography
          fontSize="1rem"
          fontWeight={400}
          color={colorOpacity}
          mb={2}>
         Informações completas do pedido
        </Typography>
       <Box display={"flex"} flexDirection={"column"} flexGrow={1}>
        <Box display={"grid"}  gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }} gap={4} flexGrow={1} width={"100%"} mt={4}> 
            <Box display={"flex"} flexDirection={"column"}>
                <Typography fontWeight={400} color={colorOpacity} fontSize="1.3rem">
                    Cliente
                </Typography>
                <Typography fontWeight={500} color="white" fontSize="1.3rem">
                    {data?.cliente}
                </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
                <Typography fontWeight={400} color={colorOpacity} fontSize="1.3rem">
                    Data do Pedido
                </Typography>
                <Typography fontWeight={500} color="white" fontSize="1.3rem">
                    {formatDateTime(data?.data_pedido)}
                </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
                <Typography fontWeight={400} color={colorOpacity} fontSize="1.3rem">
                    Canal de Venda
                </Typography>
                <Typography fontWeight={500} color="white" fontSize="1.3rem">
                    {data?.canal}
                </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
                <Typography fontWeight={400} color={colorOpacity} fontSize="1.3rem">
                    Método de Entrega
                </Typography>
                <Typography fontWeight={500} color="white" fontSize="1.3rem">
                    {data?.entrega}
                </Typography>
            </Box>
        </Box>

      <Typography color={colorOpacity} fontWeight={400} fontSize={"1.2rem"} mt={4}>
      Itens
      </Typography>
      <TableContainer sx={{ maxHeight: "450px",  mt:0, overflowX: "auto" }}>
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
              <TableCell sx={cellStyle}>{row.qtd}</TableCell>
              <TableCell sx={cellStyleBold}>{maskCurrency(row.val_un)}</TableCell>
              <TableCell sx={cellStyleBold}>{maskCurrency(row.sub_total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack display={"flex"} flexDirection={"row"} flexGrow={1} justifyContent={"flex-end"} mt={4}>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"flex-start"}>
        <Stack display={"flex"} flexDirection={"row"} gap={0.5} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
        <Typography color={colorOpacity} fontWeight={300} fontSize={"0.9rem"}>
          Subtotal: 
        </Typography>
        <Typography
        fontWeight={400}
        color="white"
        fontSize="1rem"
       
        > {maskCurrency(data?.sub_total?? 0)}
        </Typography>
        </Stack>
        <Stack display={"flex"} flexDirection={"row"} gap={0.5} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
        <Typography color={colorOpacity} fontWeight={300} fontSize={"0.9rem"}>
          Desconto: 
        </Typography>
        <Typography
        fontWeight={400}
        color="white"
        fontSize="1rem"
       
        > {data?.desconto}%
        </Typography>
        </Stack>
        <Stack display={"flex"} flexDirection={"row"} gap={0.5} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
        <Typography color={colorOpacity} fontWeight={300} fontSize={"0.9rem"}>
          Frete: 
        </Typography>
        <Typography
        fontWeight={400}
        color="white"
        fontSize="1rem"
       
        > {maskCurrency(data?.val_frete?? 0)}
        </Typography>
        </Stack>
        <Stack display={"flex"} flexDirection={"row"} gap={0.5} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
        <Typography color={colorOpacity} fontWeight={300} fontSize={"1rem"}>
          Valor Total: 
        </Typography>
        <Typography
        fontWeight="bold"
        fontSize="1.2rem"
        sx={{ background: "linear-gradient(90deg, #f7a41c, #f97316)",  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }}
        > {maskCurrency(data?.total?? 0)}
        </Typography>
        </Stack>

      </Box>
    </Stack>
    <Stack display={"flex"} justifyContent={"flex-start"} flexDirection={"row"} mb={2}>
        <Box display={"flex"} flexDirection={"column"}>
            <Typography fontWeight={300} color={colorGray}>Observação</Typography>
            <Typography fontWeight={500} color="white">{data?.grupo_cliente} - {data?.observacao}</Typography>
        </Box>
    </Stack>
      </Box>
      </Box>
    </Modal>
  );
}

