import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Shield, Upload, Wifi } from "lucide-react";
import { bgComponents, bgView, bordasComponents, colorOpacity, primaryColor } from "../../../../theme/theme";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { ConfigFiscalEmpresaDTO } from "../notasFiscais/dto/NFeDTO";
import type { CertificadoDigitalEntity } from "../notasFiscais/entity/NFeEntity";
import {
  getCertificado,
  getStatusSefaz,
  updateConfigFiscal,
  uploadCertificado,
} from "../notasFiscais/repository/NFeRepository";

export function ConfigFiscalPage() {
  const [certificado, setCertificado] = useState<CertificadoDigitalEntity | null>(null);
  const [sefazStatus, setSefazStatus] = useState<string>("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [uploading, setUploading] = useState(false);
  const [senha, setSenha] = useState("");

  const { control, handleSubmit, reset } = useForm<ConfigFiscalEmpresaDTO>({
    defaultValues: { uf: "", regime_tributario: 1, csc_id: "", csc_token: "", nfe_ambiente: 2 },
  });

  useEffect(() => {
    fetchCertificado();
  }, []);

  const fetchCertificado = async () => {
    try {
      const resp = await getCertificado();
      if (resp.data.success) {
        setCertificado(resp.data.data);
      }
    } catch {
      // No certificate yet
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !senha) {
      setSnackbar({ open: true, message: "Selecione o arquivo e informe a senha.", severity: "error" });
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

        try {
          const resp = await uploadCertificado({ pfx_base64: base64, senha });
          if (resp.data.success) {
            setSnackbar({ open: true, message: "Certificado carregado com sucesso!", severity: "success" });
            setCertificado(resp.data.data);
          } else {
            setSnackbar({ open: true, message: resp.data.message || "Erro ao carregar certificado.", severity: "error" });
          }
        } catch {
          setSnackbar({ open: true, message: "Erro ao enviar certificado.", severity: "error" });
        } finally {
          setUploading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch {
      setUploading(false);
      setSnackbar({ open: true, message: "Erro ao ler arquivo.", severity: "error" });
    }
  };

  const handleCheckSefaz = async () => {
    try {
      const resp = await getStatusSefaz();
      if (resp.data.success) {
        setSefazStatus("Serviço SEFAZ: Operando normalmente");
        setSnackbar({ open: true, message: "SEFAZ online!", severity: "success" });
      } else {
        setSefazStatus(resp.data.message || "Erro");
        setSnackbar({ open: true, message: resp.data.message || "Erro ao consultar SEFAZ.", severity: "error" });
      }
    } catch (err: any) {
      setSefazStatus("Erro ao consultar SEFAZ");
      setSnackbar({ open: true, message: err?.response?.data?.message || "Erro ao consultar SEFAZ.", severity: "error" });
    }
  };

  const onSubmitConfig = async (data: ConfigFiscalEmpresaDTO) => {
    try {
      const resp = await updateConfigFiscal(data);
      if (resp.data.success) {
        setSnackbar({ open: true, message: "Configuração salva!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: resp.data.message || "Erro ao salvar.", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "Erro ao salvar configuração.", severity: "error" });
    }
  };

  return (
    <Box>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <Stack spacing={3}>
        {/* Certificado Digital */}
        <Card sx={{ bgcolor: bgComponents, border: bordasComponents }}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Shield size={20} color={primaryColor} />
              <Typography variant="h6" color="#fff">Certificado Digital A1</Typography>
            </Stack>

            {certificado && (
              <Box sx={{ mb: 2, p: 2, bgcolor: bgView, borderRadius: 1 }}>
                <Typography color={colorOpacity} variant="body2">Razão Social: <span style={{ color: "#fff" }}>{certificado.razao_social}</span></Typography>
                <Typography color={colorOpacity} variant="body2">CNPJ: <span style={{ color: "#fff" }}>{certificado.cnpj}</span></Typography>
                <Typography color={colorOpacity} variant="body2">
                  Validade: <span style={{ color: "#fff" }}>
                    {certificado.validade_inicio ? new Date(certificado.validade_inicio).toLocaleDateString("pt-BR") : "-"} até {certificado.validade_fim ? new Date(certificado.validade_fim).toLocaleDateString("pt-BR") : "-"}
                  </span>
                </Typography>
                <Chip
                  label={certificado.valido ? "Válido" : "Expirado"}
                  color={certificado.valido ? "success" : "error"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            )}

            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                type="password"
                size="small"
                label="Senha do Certificado"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <Button
                component="label"
                variant="contained"
                startIcon={<Upload size={16} />}
                disabled={uploading || !senha}
                sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: "#d97706" } }}
              >
                {uploading ? "Enviando..." : "Upload .pfx"}
                <input type="file" accept=".pfx,.p12" hidden onChange={handleFileUpload} />
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Status SEFAZ */}
        <Card sx={{ bgcolor: bgComponents, border: bordasComponents }}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Wifi size={20} color="#22c55e" />
              <Typography variant="h6" color="#fff">Status SEFAZ</Typography>
            </Stack>
            {sefazStatus && (
              <Typography color={colorOpacity} variant="body2" sx={{ mb: 1 }}>{sefazStatus}</Typography>
            )}
            <Button variant="outlined" onClick={handleCheckSefaz}>Verificar Status</Button>
          </CardContent>
        </Card>

        {/* Configuração Fiscal */}
        <Card sx={{ bgcolor: bgComponents, border: bordasComponents }}>
          <CardContent>
            <Typography variant="h6" color="#fff" sx={{ mb: 2 }}>Configuração Fiscal da Empresa</Typography>
            <Divider sx={{ borderColor: "rgba(40, 61, 107, 0.4)", mb: 2 }} />

            <form onSubmit={handleSubmit(onSubmitConfig)}>
              <Stack spacing={2}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <Controller
                    name="uf"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} size="small" label="UF" placeholder="SP" sx={{ flex: 1 }} />
                    )}
                  />
                  <Controller
                    name="regime_tributario"
                    control={control}
                    render={({ field }) => (
                      <FormControl size="small" sx={{ flex: 1 }}>
                        <InputLabel>Regime Tributário</InputLabel>
                        <Select {...field} label="Regime Tributário">
                          <MenuItem value={1}>Simples Nacional</MenuItem>
                          <MenuItem value={2}>Simples Nacional - Excesso</MenuItem>
                          <MenuItem value={3}>Regime Normal</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="nfe_ambiente"
                    control={control}
                    render={({ field }) => (
                      <FormControl size="small" sx={{ flex: 1 }}>
                        <InputLabel>Ambiente</InputLabel>
                        <Select {...field} label="Ambiente">
                          <MenuItem value={2}>Homologação</MenuItem>
                          <MenuItem value={1}>Produção</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Stack>

                <Typography color={colorOpacity} variant="body2" sx={{ mt: 1 }}>
                  CSC (Código de Segurança do Contribuinte) - necessário para NFCe:
                </Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <Controller
                    name="csc_id"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} size="small" label="CSC ID" placeholder="000001" sx={{ flex: 1 }} />
                    )}
                  />
                  <Controller
                    name="csc_token"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} size="small" label="CSC Token" placeholder="Token gerado no portal SEFAZ" sx={{ flex: 2 }} />
                    )}
                  />
                </Stack>

                <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start", bgcolor: primaryColor, "&:hover": { bgcolor: "#d97706" } }}>
                  Salvar Configuração
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
