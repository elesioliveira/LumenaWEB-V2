import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../provider/AuthProvider";
import { CurrentPageEnum } from "../enums/CurrentPageEnum";
import { submitLogin } from "../repository/AuthRepository";
import { useSessionController } from "../controller/SessionController";

export function LoginForm() {
const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
const { onChagendCurrentPage } = useAuth();
const [isLoading, setLoading] = useState(false);
const [email, setEmail] = useState<string | null>(null);
const [password, setPassword] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);
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


const handleLogin = async () => {
try {
if ((!email || email.trim() === "") || !password || password.trim() === "") {
      setError("Campo(s) vazio");
        return false;}
setLoading(true);
await new Promise(resolve => setTimeout(resolve, 1000));
 const result = await submitLogin(email, password);

if (!result.success) {
  setError(result.message ?? "Erro. Contate o administrador.");
  return;
}
// seta o usuário globalmente
useSessionController.getState().setUser(result.data);
  // redireciona
  navigate("/Home");
} catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
};


    return (
   <Box width="100%" sx={{ py: 2, mt:20}}> {/* aumentei de 400 → 480 */}
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
    {/* Títulos */}
    <Typography variant="h4" fontWeight="bold" color="#0f1729" mb={1}>
      Bem-vindo de volta
    </Typography>

    <Typography variant="h6" color="text.secondary" mb={5}>
      Entre com suas credenciais para acessar sua conta
    </Typography>

    {/* === Input Email === */}
    <Typography variant="subtitle1" color="#0f1729" fontWeight="400">
      Email
    </Typography>

    <TextField
      fullWidth
      placeholder="seu@email.com"
      margin="dense"
      variant="outlined"
      value={email}
      onChange={(e) => setEmail(e.target.value.trim())}
      InputProps={{
        sx: { height: 60, fontSize: "1.1rem", mb:2, color:"black" }, // input maior
        startAdornment: (
          <Mail size={24} style={{ marginRight: "10px", opacity: 0.6 }} />
        ),
      }}
    />

    {/* === Input Senha === */}
    <Typography variant="subtitle1" color="#0f1729" fontWeight="400">
      Senha
    </Typography>

    <TextField
      fullWidth
      type={showPassword ? "text" : "password"}
      placeholder="*****"
      margin="dense"
      variant="outlined"
      value={password}
      onChange={(e) => setPassword(e.target.value.trim())}
      InputProps={{
        sx: { height: 60, fontSize: "1.1rem",color:"black" },
        startAdornment: (
          <Lock size={24} style={{ marginRight: "10px", opacity: 0.6 }} />
        ),
        endAdornment: (
          <Box
            sx={{ cursor: "pointer", opacity: 0.7 }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </Box>
        ),
      }}
    />

    {/* Esqueceu a senha */}
    <Typography
  variant="body1"
  sx={{
    textAlign: "right",
    mt: 1,
    cursor: "pointer",
    color: "primary.main",
    fontWeight: 400,
    "&:hover": { textDecoration: "underline" }
  }}
  onClick={() => onChagendCurrentPage(CurrentPageEnum.ForgotPassword)}
>
  Esqueceu a senha?
</Typography>


    {/* === Botão Entrar (Com animação hover) === */}
<Button
  fullWidth
  onClick={handleLogin}
  disabled={isLoading}
  variant="contained"
  sx={{
    mt: 5,
    mb: 4,
    height: "60px",
    fontSize: "1.2rem",
    flex: 1,
    color: "#FFF",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #f49c0a, #ec8d09, #ec8d09, #df7109)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.5, // distância entre o texto e o ícone
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
      background: "linear-gradient(90deg, #f7a41c, #b5770a)",
    },
  }}>
   {isLoading ? <CircularProgress size={28} color="inherit" /> : "Entrar"}
    {isLoading ? null : <ArrowRight size={26} />}
  
</Button>


    {/* Divisor OU */}
    <Stack direction="row" alignItems="center" spacing={2} mb={4}>
      <Divider sx={{ flex: 1 }} />
      <Typography variant="body1" color="text.secondary" fontWeight={600}>
        Ou
      </Typography>
      <Divider sx={{ flex: 1 }} />
    </Stack>
<Stack direction="row" justifyContent="center" spacing={1} mt={2}>
  <Typography variant="body1" color="text.secondary">
    Ainda não tem uma conta?
  </Typography>

<Typography
  variant="body1"
  sx={{
    cursor: "pointer",
    color: "primary.main",
    fontWeight: 600,
    "&:hover": { textDecoration: "underline" },
  }}
  onClick={() => onChagendCurrentPage(CurrentPageEnum.Register)}
>
  Criar conta
</Typography>

</Stack>
  </Box>

    );
}