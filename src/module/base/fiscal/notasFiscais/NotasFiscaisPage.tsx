import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Ban, FileCode, FileText, Pencil, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { bordasComponents, primaryColor } from "../../../../theme/theme";
import type { NotaFiscalEntity } from "./entity/NFeEntity";
import { cancelarNFe, cartaCorrecaoNFe, downloadNFePdf, downloadNFeXml, getHistoricoNFe } from "./repository/NFeRepository";

export function NotasFiscaisPage() {
  const [notas, setNotas] = useState<NotaFiscalEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [modeloFilter, setModeloFilter] = useState<number | "">("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [cancelDialog, setCancelDialog] = useState<{ open: boolean; notaId: number | null }>({ open: false, notaId: null });
  const [justificativa, setJustificativa] = useState("");
  const [ccDialog, setCcDialog] = useState<{ open: boolean; notaId: number | null }>({ open: false, notaId: null });
  const [correcao, setCorrecao] = useState("");

  const fetchNotas = async () => {
    setLoading(true);
    try {
      const resp = await getHistoricoNFe(
        statusFilter || null,
        modeloFilter || null
      );
      setNotas(resp.data.data ?? []);
    } catch {
      setSnackbar({ open: true, message: "Erro ao buscar notas fiscais.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  const handleCancelar = async () => {
    if (!cancelDialog.notaId || justificativa.length < 15) return;
    try {
      const resp = await cancelarNFe({ nota_fiscal_id: cancelDialog.notaId, justificativa });
      if (resp.data.success) {
        setSnackbar({ open: true, message: "Nota cancelada com sucesso.", severity: "success" });
        fetchNotas();
      } else {
        setSnackbar({ open: true, message: resp.data.message || "Falha ao cancelar.", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "Erro ao cancelar nota fiscal.", severity: "error" });
    } finally {
      setCancelDialog({ open: false, notaId: null });
      setJustificativa("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "autorizada": return "success";
      case "cancelada": return "warning";
      case "rejeitada": return "error";
      case "denegada": return "error";
      default: return "default";
    }
  };

  const handleCartaCorrecao = async () => {
    if (!ccDialog.notaId || correcao.length < 15) return;
    try {
      const resp = await cartaCorrecaoNFe(ccDialog.notaId, correcao);
      if (resp.data.success) {
        setSnackbar({ open: true, message: "Carta de correção registrada.", severity: "success" });
      } else {
        setSnackbar({ open: true, message: resp.data.message || "Falha.", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "Erro ao enviar carta de correção.", severity: "error" });
    } finally {
      setCcDialog({ open: false, notaId: null });
      setCorrecao("");
    }
  };

  return (
    <Box>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <Dialog open={cancelDialog.open} onClose={() => setCancelDialog({ open: false, notaId: null })}>
        <DialogTitle>Cancelar Nota Fiscal</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Informe a justificativa para o cancelamento (mínimo 15 caracteres):
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
            placeholder="Motivo do cancelamento..."
            helperText={`${justificativa.length}/15 caracteres mínimos`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialog({ open: false, notaId: null })}>Voltar</Button>
          <Button color="error" variant="contained" onClick={handleCancelar} disabled={justificativa.length < 15}>
            Confirmar Cancelamento
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={ccDialog.open} onClose={() => setCcDialog({ open: false, notaId: null })}>
        <DialogTitle>Carta de Correção</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Informe o texto de correção (mínimo 15 caracteres):
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={correcao}
            onChange={(e) => setCorrecao(e.target.value)}
            placeholder="Texto da correção..."
            helperText={`${correcao.length}/15 caracteres mínimos`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCcDialog({ open: false, notaId: null })}>Voltar</Button>
          <Button color="warning" variant="contained" onClick={handleCartaCorrecao} disabled={correcao.length < 15}>
            Enviar Carta de Correção
          </Button>
        </DialogActions>
      </Dialog>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="autorizada">Autorizada</MenuItem>
            <MenuItem value="cancelada">Cancelada</MenuItem>
            <MenuItem value="rejeitada">Rejeitada</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Modelo</InputLabel>
          <Select value={modeloFilter} onChange={(e) => setModeloFilter(e.target.value as number | "")} label="Modelo">
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value={55}>NFe (55)</MenuItem>
            <MenuItem value={65}>NFCe (65)</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<RefreshCw size={16} />}
          onClick={fetchNotas}
          disabled={loading}
          sx={{
            color: "#fff",
            border: bordasComponents,
            "&:hover": {
              border: `1px solid ${primaryColor}`,
              boxShadow: "0 0 15px rgba(245,159,10,0.15)",
            },
          }}
        >
          Atualizar
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8" }}>Número</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Modelo</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Status</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Destinatário</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Valor Total</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Data Emissão</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Protocolo</TableCell>
              <TableCell sx={{ color: "#94a3b8" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notas.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ color: "#64748b" }}>
                  {loading ? "Carregando..." : "Nenhuma nota fiscal encontrada."}
                </TableCell>
              </TableRow>
            )}
            {notas.map((nota) => (
              <TableRow key={nota.id}>
                <TableCell sx={{ color: "#fff" }}>{nota.numero}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{nota.modelo === 55 ? "NFe" : "NFCe"}</TableCell>
                <TableCell>
                  <Chip label={nota.status} size="small" color={getStatusColor(nota.status)} />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{nota.dest_nome || nota.dest_cpf_cnpj || "-"}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {nota.valor_total ? `R$ ${nota.valor_total.toFixed(2)}` : "-"}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {nota.data_emissao ? new Date(nota.data_emissao).toLocaleDateString("pt-BR") : "-"}
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "0.75rem" }}>
                  {nota.protocolo_autorizacao || nota.motivo_rejeicao || "-"}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5}>
                    {nota.status === "autorizada" && (
                      <>
                        <Tooltip title="Download PDF">
                          <IconButton size="small" color="primary" onClick={() => downloadNFePdf(nota.id)}>
                            <FileText size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download XML">
                          <IconButton size="small" color="info" onClick={() => downloadNFeXml(nota.id)}>
                            <FileCode size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Carta de Correção">
                          <IconButton size="small" color="warning" onClick={() => setCcDialog({ open: true, notaId: nota.id })}>
                            <Pencil size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancelar">
                          <IconButton size="small" color="error" onClick={() => setCancelDialog({ open: true, notaId: nota.id })}>
                            <Ban size={16} />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    {nota.status !== "autorizada" && nota.chave_acesso && (
                      <Tooltip title="Download XML">
                        <IconButton size="small" color="info" onClick={() => downloadNFeXml(nota.id)}>
                          <FileCode size={16} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
