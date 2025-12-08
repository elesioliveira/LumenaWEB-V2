import { ArrowRight } from "lucide-react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { useAuth } from "../provider/AuthProvider";
import { CurrentPageEnum } from "../enums/CurrentPageEnum";

export function LoginForm() {
const [showPassword, setShowPassword] = useState(false);
  const { onChagendCurrentPage } = useAuth();


    return (
   <Box width="100%" sx={{ py: 2, mt:20}}> {/* aumentei de 400 → 480 */}

    {/* Títulos */}
    <Typography variant="h4" fontWeight="bold" color="text.primary" mb={1}>
      Bem-vindo de volta
    </Typography>

    <Typography variant="h6" color="text.secondary" mb={5}>
      Entre com suas credenciais para acessar sua conta
    </Typography>

    {/* === Input Email === */}
    <Typography variant="subtitle1" color="text.primary" fontWeight="400">
      Email
    </Typography>

    <TextField
      fullWidth
      placeholder="seu@email.com"
      margin="dense"
      variant="outlined"
      InputProps={{
        sx: { height: 60, fontSize: "1.1rem" }, // input maior
        startAdornment: (
          <Mail size={24} style={{ marginRight: "10px", opacity: 0.6 }} />
        ),
      }}
    />

    {/* === Input Senha === */}
    <Typography variant="subtitle1" color="text.primary" fontWeight="400">
      Senha
    </Typography>

    <TextField
      fullWidth
      type={showPassword ? "text" : "password"}
      placeholder="*****"
      margin="dense"
      variant="outlined"
      InputProps={{
        sx: { height: 60, fontSize: "1.1rem" },
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
  }}
>
  Entrar
  <ArrowRight size={26} />
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