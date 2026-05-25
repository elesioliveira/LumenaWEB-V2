import { useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import {
  Mail,
  MessageCircle,
  Instagram,
  Send,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import {
  bgView,
  bgColorCardsDashBoard,
  bordasComponents,
  colorOpacity,
  primaryColor,
  bgColorTopSellers,
} from "../../../theme/theme";

const SUPPORT_EMAIL = "suporte@lumenasystem.com.br";
const WHATSAPP_NUMBER = "5547997531517";
const WHATSAPP_DISPLAY = "(47) 99753-1517";
const INSTAGRAM_HANDLE = "@lumenasystem";

const cardSx = {
  bgcolor: bgColorCardsDashBoard,
  border: bordasComponents,
  borderRadius: 2,
  p: 3,
  position: "relative" as const,
  overflow: "hidden",
  transition: "0.3s ease",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
    borderColor: "rgba(40, 61, 107, 0.9)",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    background:
      "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
    opacity: 0,
    transition: "0.3s ease",
    pointerEvents: "none",
  },
  "&:hover:before": { opacity: 1 },
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: bgColorTopSellers,
    color: "#fff",
    "& .MuiOutlinedInput-notchedOutline": { border: bordasComponents },
    "&:hover fieldset": { borderColor: primaryColor },
    "&.Mui-focused fieldset": {
      borderColor: primaryColor,
      borderWidth: 2,
    },
  },
  "& input": { color: "#fff", fontSize: "0.9rem" },
  "& textarea": { color: "#fff", fontSize: "0.9rem" },
  "& input::placeholder": { color: colorOpacity, opacity: 1 },
  "& textarea::placeholder": { color: colorOpacity, opacity: 1 },
  "& .MuiInputLabel-root": { color: colorOpacity },
  "& .MuiInputLabel-root.Mui-focused": { color: primaryColor },
};

const channels = [
  {
    icon: Mail,
    title: "Email",
    value: SUPPORT_EMAIL,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.12)",
    action: () => window.open(`mailto:${SUPPORT_EMAIL}`, "_blank"),
    buttonLabel: "Enviar email",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.12)",
    action: () =>
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, preciso de suporte.")}`,
        "_blank",
      ),
    buttonLabel: "Abrir WhatsApp",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: INSTAGRAM_HANDLE,
    color: "#E040FB",
    bg: "rgba(224,64,251,0.12)",
    action: () =>
      window.open("https://instagram.com/lumenasystem", "_blank"),
    buttonLabel: "Abrir Instagram",
  },
];

export function SupportPage() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = subject.trim().length > 0 && description.trim().length > 0;

  const buildMessage = () =>
    `[Suporte Lumena]\nAssunto: ${subject}\n\n${description}`;

  const handleSendEmail = () => {
    const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(description)}`;
    window.open(mailto, "_blank");
  };

  const handleSendWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank");
  };

  const handleClearForm = () => {
    setSubject("");
    setDescription("");
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: bgView,
        pl: { xs: 1, md: 2.5 },
        pr: { xs: 1, md: 2.5 },
        overflowY: "auto",
        overflowX: "hidden",
        minHeight: 0,
      }}
    >
      <Toolbar />

      {/* Header */}
      <Typography
        variant="h2"
        component="div"
        sx={{ fontSize: { xs: "1.4rem", md: "2rem" } }}
        color="#fff"
        mt={7}
        fontWeight="bold"
      >
        Suporte
      </Typography>
      <Typography color={colorOpacity} fontSize="0.9rem" mt={0.5} mb={4}>
        Entre em contato conosco ou relate um problema
      </Typography>

      {/* Contact Channels */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 2.5,
          mb: 4,
        }}
      >
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <Box key={ch.title} sx={cardSx} onClick={ch.action}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: ch.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={24} color={ch.color} />
                </Box>

                <Box>
                  <Typography
                    color="#fff"
                    fontWeight={600}
                    fontSize="1rem"
                    mb={0.5}
                  >
                    {ch.title}
                  </Typography>
                  <Typography color={colorOpacity} fontSize="0.85rem">
                    {ch.value}
                  </Typography>
                </Box>

                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography
                    color={primaryColor}
                    fontSize="0.8rem"
                    fontWeight={500}
                  >
                    {ch.buttonLabel}
                  </Typography>
                  <ExternalLink size={14} color={primaryColor} />
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Box>

      {/* Report a Problem */}
      <Box sx={{ ...cardSx, cursor: "default", p: 3, mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "rgba(245,159,10,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertCircle size={22} color={primaryColor} />
          </Box>
          <Box>
            <Typography color="#fff" fontWeight={600} fontSize="1.1rem">
              Relatar um Problema
            </Typography>
            <Typography color={colorOpacity} fontSize="0.8rem">
              Descreva o problema e envie pelo canal de sua preferência
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Assunto"
            placeholder="Ex: Erro ao gerar relatório de vendas"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={inputSx}
          />

          <TextField
            fullWidth
            label="Descrição"
            placeholder="Descreva o problema com o máximo de detalhes possível..."
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={inputSx}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            mt={1}
          >
            <Button
              variant="contained"
              disabled={!canSubmit}
              onClick={handleSendEmail}
              startIcon={<Mail size={18} />}
              sx={{
                background: canSubmit
                  ? "linear-gradient(to right, #3B82F6, #2563EB)"
                  : undefined,
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                "&:hover": {
                  background: "linear-gradient(to right, #2563EB, #1D4ED8)",
                },
              }}
            >
              Enviar por Email
            </Button>

            <Button
              variant="contained"
              disabled={!canSubmit}
              onClick={handleSendWhatsApp}
              startIcon={<MessageCircle size={18} />}
              sx={{
                background: canSubmit
                  ? "linear-gradient(to right, #22C55E, #16A34A)"
                  : undefined,
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                "&:hover": {
                  background: "linear-gradient(to right, #16A34A, #15803D)",
                },
              }}
            >
              Enviar por WhatsApp
            </Button>

            {canSubmit && (
              <Button
                variant="text"
                onClick={handleClearForm}
                sx={{
                  color: colorOpacity,
                  textTransform: "none",
                  "&:hover": { color: "#fff", background: "rgba(255,255,255,0.06)" },
                }}
              >
                Limpar
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
