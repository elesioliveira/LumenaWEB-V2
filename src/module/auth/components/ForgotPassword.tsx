import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { loginInputSx } from "../../../theme/theme";
import { useForgotPasswordController } from "../controller/ForgotPasswordController";
import { CurrentPageEnum } from "../enums/CurrentPageEnum";
import { useAuth } from "../provider/AuthProvider";

export function ForgotPassword() {
  const { onChagendCurrentPage } = useAuth();
  const {
    email,
    setEmail,
    isLoading,
    error,
    setError,
    handleSubmitForm,
  } = useForgotPasswordController();

  // Toast
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

  // Mostrar erros no toast automaticamente
  useEffect(() => {
    if (error) {
      setToastMsg(error);
      setToastType("error");
      setToastOpen(true);
      setError(null);
    }
  }, [error]);

  async function submit() {
    const ok = await handleSubmitForm();
    if (ok) {
      setToastMsg("Link de recuperação enviado!");
      setToastType("success");
      setToastOpen(true);

      setTimeout(() => {
        onChagendCurrentPage(CurrentPageEnum.Signin);
      }, 1500);
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "480px", py: 4, px: { xs: 2, md: 3 }, my: "auto" }}>
      {/* Títulos */}
      <Typography variant="h4" fontWeight="bold" color="#0f1729" mb={1}>
        Esqueceu a senha?
      </Typography>

      <Typography variant="h6" color="text.secondary" mb={3} fontSize="18px">
        Não se preocupe! Digite seu e-mail e enviaremos um link para redefinir sua senha.
      </Typography>

      {/* Input Email */}
      <Typography variant="subtitle1" color="#0f1729" fontWeight="400" sx={{ mb: 0 }}>
        Email
      </Typography>

      <TextField
        fullWidth
        placeholder="seu@email.com"
        margin="dense"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ ...loginInputSx, mb: 2 }}
        InputProps={{
          startAdornment: (
            <Mail size={24} style={{ marginRight: "10px", opacity: 0.6,color:'black' }} />
          ),
        }}
      />

      {/* Botão */}
      <Button
        fullWidth
        variant="contained"
        onClick={submit}
        disabled={isLoading}
        sx={{
          mt: 3,
          mb: 4,
          height: "60px",
          fontSize: "1.2rem",
          color: "#FFF",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #f49c0a, #ec8d09, #df7109)",
          transition: "0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
            background: "linear-gradient(90deg, #f7a41c, #b5770a)",
          },
        }}
      >
        {isLoading ? <Loader2 className="spin" size={26} /> : "Enviar link de recuperação"}
        {!isLoading && <ArrowRight size={26} />}
      </Button>

      {/* Voltar */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{
          cursor: "pointer",
          color: "text.secondary",
          mt: 2,
          width: "fit-content",
          mx: "auto",
          "&:hover": {
            textDecoration: "underline",
            background: "linear-gradient(90deg, #f7a41c, #b5770a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => onChagendCurrentPage(CurrentPageEnum.Signin)}
      >
        <ArrowLeft size={20} />
        <Typography variant="body1" fontWeight="bold">
          Voltar ao login
        </Typography>
      </Stack>

      {/* Toast */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
      >
        <Alert severity={toastType} sx={{ width: "100%" }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
