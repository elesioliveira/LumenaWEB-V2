import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Pencil, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatDateTime } from "../../../../shared/MaskUtils";
import { cellStyle, cellStyleBold } from "../../../../theme/cellTable";
import { bgColorNegative, bgColorPositive, bgComponents, colorNegative, colorOpacity, colorPositive, hoverGlow, primaryColor } from "../../../../theme/theme";
import { PaginationButton } from "../../produto/fornecedor/components/PaginationButton";
import { CreateOrUpdateCfopModal } from "./components/CreateOrUpdateCfopModal";
import type { CfopEntity } from "./entity/CfopEntity";
import { getCfops, updateCfop } from "./repository/CfopRepository";

const tipoOperacaoLabels: Record<string, string> = {
  venda: "Venda",
  devolucao: "Devolução",
  estorno: "Estorno",
  avaria: "Avaria",
  transferencia: "Transferência",
  remessa: "Remessa",
  outros: "Outros",
};

export function CfopPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCfop, setSelectedCfop] = useState<CfopEntity | null>(null);
  const [cfops, setCfops] = useState<CfopEntity[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [loading, setLoading] = useState(false);
  const jaCarregouRef = useRef(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(cfops.length / rowsPerPage);
  const cfopsPaginadas = cfops.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchCfops = async () => {
    setLoading(true);
    try {
      const response = await getCfops();
      if (response?.success) {
        setCfops(response.data);
        if (page >= totalPages && totalPages > 0) {
          setPage(0);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const onChangedAtivo = async (row: CfopEntity) => {
    try {
      setLoading(true);
      const updated = { ...row, ativo: !row.ativo };
      const response = await updateCfop(updated);
      if (!response?.success) {
        setToastType("error");
        setToastMsg(response?.message ?? "Erro ao mudar status da CFOP.");
        setToastOpen(true);
        return;
      }
      await fetchCfops();
      setPage(0);
    } catch {
      setToastType("error");
      setToastMsg("Erro ao mudar status da CFOP.");
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jaCarregouRef.current) return;
    jaCarregouRef.current = true;
    fetchCfops();
  }, []);

  const handleEdit = (row: CfopEntity) => {
    setSelectedCfop(row);
    setOpenModal(true);
  };

  return (
    <Box flexDirection="column">
      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={toastType} onClose={() => setToastOpen(false)} sx={{ width: "100%" }}>
          {toastMsg}
        </Alert>
      </Snackbar>

      <CreateOrUpdateCfopModal
        open={openModal}
        onClose={() => {
          setSelectedCfop(null);
          setOpenModal(false);
        }}
        onSuccess={async () => { await fetchCfops(); }}
        cfop={selectedCfop}
      />

      <Box display="flex" flexDirection="column" flexGrow={2} sx={{ pl: { xs: 1, md: 2 } }}>
        <Stack display="flex" direction={{ xs: "column", md: "row" }} flexGrow={2} justifyContent="space-between" flexWrap="wrap" gap={{ xs: 1, md: 2 }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#fff" }}>
            CFOPs
          </Typography>
          <Stack display="flex" direction={{ xs: "column", md: "row" }} gap={{ xs: 1, md: 2 }} mr={3} flexWrap="wrap">
            <Button
              startIcon={<Plus />}
              onClick={() => setOpenModal(true)}
              sx={{
                height: 40,
                width: { xs: "100%", md: 250 },
                px: 3,
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 1,
                background: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
                boxShadow: "0 0 20px rgba(245,159,10,0.35)",
                transition: "0.25s ease",
                "&:hover": {
                  background: "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
                  boxShadow: "0 0 25px rgba(245,159,10,0.55)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              NOVA CFOP
            </Button>
          </Stack>
        </Stack>

        <Box mr={2} flexGrow={1}>
          {loading && (
            <Stack height={200} alignItems="center" justifyContent="center">
              <CircularProgress color="inherit" />
              <Typography mt={2} color={colorOpacity}>
                Carregando CFOPs...
              </Typography>
            </Stack>
          )}

          {!loading && cfops.length === 0 && (
            <Stack height={200} alignItems="center" justifyContent="center">
              <Typography color={colorOpacity}>
                Nenhuma CFOP cadastrada.
              </Typography>
            </Stack>
          )}

          {!loading && cfops.length > 0 && (
            <TableContainer sx={{ maxHeight: "100%", mr: 5, mt: 2, overflowX: "auto" }}>
              <Table
                stickyHeader
                sx={{
                  bgcolor: "transparent",
                  borderCollapse: "separate",
                  borderSpacing: "0 8px",
                  minWidth: 700,
                }}
              >
                <TableHead>
                  <TableRow>
                    {["Código", "Natureza", "Tipo Operação", "Status", "Cadastro", "Ações"].map((col) => (
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
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {cfopsPaginadas.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.02)",
                        transition: "all 0.25s ease",
                        ...hoverGlow,
                      }}
                    >
                      <TableCell sx={cellStyleBold}>{row.codigo}</TableCell>
                      <TableCell sx={cellStyle}>{row.natureza_operacao ?? "-"}</TableCell>
                      <TableCell sx={cellStyle}>
                        {tipoOperacaoLabels[row.tipo_operacao ?? ""] ?? row.tipo_operacao}
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
                            color: row.ativo ? colorPositive : colorNegative,
                            bgcolor: row.ativo ? bgColorPositive : bgColorNegative,
                          }}
                        >
                          {row.ativo ? "ativo" : "inativo"}
                        </Box>
                      </TableCell>
                      <TableCell sx={cellStyle}>{formatDateTime(row.data_cadastro)}</TableCell>
                      <TableCell sx={cellStyle}>
                        <Stack direction="row" spacing={1} justifyContent="start" alignItems="start">
                          <Box
                            onClick={() => handleEdit(row)}
                            sx={{
                              width: 32,
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 1,
                              cursor: "pointer",
                              color: colorOpacity,
                              transition: "0.25s ease",
                              "&:hover": {
                                color: primaryColor,
                                backgroundColor: "rgba(245,159,10,0.15)",
                                boxShadow: "0 0 12px rgba(245,159,10,0.45)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Pencil size={16} />
                          </Box>
                          <Box
                            onClick={() => onChangedAtivo(row)}
                            sx={{
                              width: 32,
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 1,
                              cursor: "pointer",
                              color: row.ativo ? colorPositive : colorNegative,
                              transition: "0.25s ease",
                              "&:hover": {
                                backgroundColor: row.ativo
                                  ? "rgba(0,200,83,0.15)"
                                  : "rgba(255,50,50,0.15)",
                                boxShadow: row.ativo
                                  ? "0 0 12px rgba(0,200,83,0.45)"
                                  : "0 0 12px rgba(255,50,50,0.45)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            {row.ativo ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                          </Box>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {!loading && cfops.length > rowsPerPage && (
            <Box mt={3} display="flex" justifyContent="center" alignItems="center" gap={2} mb={2} flexWrap="wrap">
              <PaginationButton disabled={page === 0} onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
                <ChevronLeft size={20} />
              </PaginationButton>
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
              <PaginationButton disabled={page >= totalPages - 1} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}>
                <ChevronRight size={20} />
              </PaginationButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
