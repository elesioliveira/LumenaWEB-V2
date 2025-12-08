import { ArrowRight, ArrowLeft } from "lucide-react";
import { Mail} from "lucide-react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useAuth } from "../provider/AuthProvider";
import { CurrentPageEnum } from "../enums/CurrentPageEnum";

export function ForgotPassword() {
 const { onChagendCurrentPage } = useAuth();

    return (
         <Box width="100%" sx={{ py: 4, mt:30}}> 
      {/* Títulos */}
    <Typography variant="h4" fontWeight="bold" color="text.primary" mb={1}>
      Esqueceu a senha?
    </Typography>
    <Typography variant="h6" color="text.secondary" mb={3} fontSize="18px">
      Não se preocupe! Digite seu e-mail e enviaremos um link para redefinir sua senha.
    </Typography>
      <Typography variant="subtitle1" color="text.primary" fontWeight="400" sx={{mb:0}}>
      Email
    </Typography>
    <TextField
      fullWidth
      placeholder="seu@email.com"
      margin="dense"
      variant="outlined"
      InputProps={{
        sx: {
          height: 55, // altura REAL
          fontSize: "1.1rem",
          '& input': {
            padding: "14px 0", // ajustes finos opcionais
          },
          mt:0
        },
        startAdornment: (
          <Mail size={24} style={{ marginRight: "10px", opacity: 0.6 }} />
        ),
      }}
    />
<Button
    fullWidth
    variant="contained"
    sx={{
      mt: 3,
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
    Enviar link de recuperação
    <ArrowRight size={26} />
</Button>
  <Stack 
    direction="row"
    alignItems="center"
    justifyContent="center"
    spacing={1}
    sx={{
      cursor: "pointer",
      color: "text.secondary",
      mt: 2,
      mx: "auto",       // faz o stack centralizar
      width: "fit-content",
      "&:hover": { textDecoration: "underline" ,
      background: "linear-gradient(90deg, #f7a41c, #b5770a)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      boxShadow: "none",
      transform: "scale(1.05)", }
    }}
    onClick={() => onChagendCurrentPage(CurrentPageEnum.Signin)}
  >
<ArrowLeft size={20} />
<Typography
  variant="body1"
  fontWeight="bold"
>
  Voltar ao login
</Typography>
  </Stack>
</Box>
    );
}