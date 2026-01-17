import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import {
  bgColorCardsDashBoard,
  colorNegative,
  colorOpacity,
} from "../../../../theme/theme";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { InfoText } from "./InfoText";

interface ModalContaPagarViewProps {
  open: boolean;
  onClose: () => void;
  id?: number | null;
}

export function ModalContaPagarView({
  open,
  onClose,
  id,
}: ModalContaPagarViewProps) {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!open || !id) return;

    setLoading(true);
    setToastOpen(false);

    const timeout = setTimeout(() => {
      const success = Math.random() > 0.3; // 70% sucesso

      if (success) {
        setToastType("success");
        setToastMsg("Conta carregada com sucesso");
      } else {
        setToastType("error");
        setToastMsg("Erro ao carregar a conta");
      }

      setToastOpen(true);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [open, id]);

  return (
    <>
      {/* TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={toastType} sx={{ width: "100%" }}>
          {toastMsg}
        </Alert>
      </Snackbar>

      <Modal open={open} onClose={onClose}>
        <Box
    sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 720,
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
          {/* HEADER */}
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography fontWeight={600} color="#fff" fontSize={"1.3rem"}>
              Detalhes da Conta
            </Typography>
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

          {/* BODY */}
          {isLoading ? (
            <Stack alignItems="center" py={4} gap={2}>
              <CircularProgress size={32} />
              <Typography fontSize="0.9rem" color={colorOpacity}>
                Carregando dados...
              </Typography>
            </Stack>
          ) : (
            <Box display={"grid"}  gridTemplateColumns="repeat(2, 1fr)" gap={4} flexGrow={1} width={"100%"} mt={4}>
                <InfoText
                title="Descrição"
                description="Compra de Mercadorias"
                />
                <InfoText
                title="Fornecedor"
                description="Fornecedor ABC"
                />
                <InfoText
                title="Categoria"
                description="Fornecedores"
                />
                <InfoText
                title="Valor"
                description="R$ 2.340,00"
                />
                <InfoText
                title="Vencimento"
                description="19/01/2024"
                />
                <InfoText
                title="Status"
                description="Pendente"
                />
                <InfoText
                title="Observações"
                description="Nota fiscal 12345"
                />
              <Stack direction="row" justifyContent="flex-end" gap={2} mt={6}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{ color: colorOpacity, borderColor: colorOpacity }}
                >
                  Fechar
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
