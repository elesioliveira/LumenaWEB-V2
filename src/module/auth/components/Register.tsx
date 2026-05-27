import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Radio,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { ArrowRight, Building2, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { maskCNPJ } from "../../../shared/MaskUtils";
import { loginInputSx } from "../../../theme/theme";
import { useRegisterController } from "../controller/RegisterController";
import { CurrentPageEnum } from "../enums/CurrentPageEnum";
import { useAuth } from "../provider/AuthProvider";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [confirmSenha, setConfirmSenha] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const { onChagendCurrentPage } = useAuth();
  const { company, handleChangeCompany, createCompanySubmit, isLoading, error } =
    useRegisterController();

  const handleSubmit = async () => {
    if (company.senha.trim() === "" || confirmSenha.trim() === "") {
      setToastType("error");
      setToastMsg("Digite a senha e a confirmação.");
      setToastOpen(true);
      return;
    }

    if (company.senha !== confirmSenha) {
      setToastType("error");
      setToastMsg("As senhas precisam ser iguais.");
      setToastOpen(true);
      return;
    }

    const ok = await createCompanySubmit();

    if (!ok) {
      setToastType("error");
      setToastMsg(error ?? "Erro ao criar conta.");
      setToastOpen(true);
      return;
    }

    setToastType("success");
    setToastMsg("Conta criada com sucesso!");
    setToastOpen(true);

    setTimeout(() => {
      onChagendCurrentPage(CurrentPageEnum.Signin);
    }, 1200);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 }, my: "auto" }}>
      {/* TITULOS */}
      <Typography variant="h5" fontWeight="bold" mb={1} color="#0f1729">
        Criar conta
      </Typography>

      <Typography variant="h6" color="text.secondary" mb={2} fontSize="18px">
        Comece a gerenciar seu negócio de forma inteligente
      </Typography>

      {/* INPUTS */}
      <Grid container spacing={2}>
        {/* Nome completo */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="400" color="#0f1729">
            Nome completo
          </Typography>
          <TextField
            fullWidth
            placeholder="Elesio Oliveira"
            margin="dense"
            variant="outlined"
            value={company.nome_responsavel}
            onChange={(e) =>
              handleChangeCompany("nome_responsavel", e.target.value)
            }
            sx={loginInputSx}
            InputProps={{
              startAdornment: (
                <User size={24} style={{ marginRight: "10px", opacity: 0.6, color: 'black' }} />
              ),
            }}
          />
        </Grid>

        {/* Nome empresa */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="400" color="#0f1729">
            Nome da empresa
          </Typography>
          <TextField
            fullWidth
            placeholder="Sua Empresa LTDA"
            margin="dense"
            variant="outlined"
            value={company.razao_social}
            onChange={(e) => handleChangeCompany("razao_social", e.target.value)}
            sx={loginInputSx}
            InputProps={{
              startAdornment: (
                <Building2 size={24} style={{ marginRight: "10px", opacity: 0.6, color: 'black' }} />
              ),
            }}
          />
        </Grid>

        {/* CNPJ */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="400" color="#0f1729">
            CNPJ
          </Typography>
          <TextField
            fullWidth
            placeholder="**.***.***/****-**"
            margin="dense"
            variant="outlined"
            value={company.cnpj}
            onChange={(e) => handleChangeCompany("cnpj", maskCNPJ(e.target.value))}
            inputProps={{ maxLength: 18 }}
            sx={loginInputSx}
            InputProps={{
              startAdornment: (
                <Building2 size={24} style={{ marginRight: "10px", opacity: 0.6, color: 'black' }} />
              ),
            }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="400" color="#0f1729">
            Email
          </Typography>
          <TextField
            fullWidth
            placeholder="seu@email.com"
            margin="dense"
            variant="outlined"
            value={company.email}
            onChange={(e) => handleChangeCompany("email", e.target.value)}
            sx={loginInputSx}
            InputProps={{
              startAdornment: (
                <Mail size={24} style={{ marginRight: "10px", opacity: 0.6, color: 'black' }} />
              ),
            }}
          />
        </Grid>

        {/* Senha */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="400" color="#0f1729">
            Senha
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="*****"
            margin="dense"
            variant="outlined"
            value={company.senha}
            onChange={(e) => handleChangeCompany("senha", e.target.value)}
            sx={loginInputSx}
            InputProps={{
              startAdornment: (
                <Lock size={24} style={{ marginRight: "10px", opacity: 0.6, color: 'black' }} />
              ),
              endAdornment: (
                <Box
                  sx={{ cursor: "pointer", opacity: 0.7, color: 'black' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </Box>
              )
            }}
          />
        </Grid>

        {/* Confirmar senha */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="400" color="#0f1729">
            Confirmar senha
          </Typography>
          <TextField
            fullWidth
            type={showPassword2 ? "text" : "password"}
            placeholder="*****"
            margin="dense"
            variant="outlined"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            sx={loginInputSx}
            InputProps={{
              startAdornment: (
                <Lock size={24} style={{ marginRight: "10px", opacity: 0.6, color: 'black' }} />
              ),
              endAdornment: (
                <Box
                  sx={{ cursor: "pointer", opacity: 0.7, color: 'black' }}
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <EyeOff size={22} /> : <Eye size={22} />}
                </Box>
              )
            }}
          />
        </Grid>
      </Grid>

      {/* CHECKBOX TERMOS */}
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ flexWrap: "wrap" }}>
        <Radio checked />
        <Typography component="span" color="#0f1729"> Eu concordo com os </Typography>
        <Typography component="span" color="primary.main" sx={{ cursor: "pointer" }}>
          Termos de uso
        </Typography>
        <Typography component="span" color="#0f1729"> e </Typography>
        <Typography component="span" color="primary.main" sx={{ cursor: "pointer" }}>
          Política de privacidade
        </Typography>
      </Stack>

      {/* BOTÃO CRIAR CONTA */}
      <Button
        fullWidth
        variant="contained"
        disabled={isLoading}
        onClick={handleSubmit}
        sx={{
          mt: 3,
          mb: 2,
          height: 60,
          fontSize: "1.2rem"  ,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          background: "linear-gradient(90deg, #f49c0a, #ec8d09, #df7109)",
          boxShadow: "0 0 14px rgba(244,156,10,0.45)",
           "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
      background: "linear-gradient(90deg, #f7a41c, #b5770a)",
    },
        }}
      >
        {isLoading ? (
          <CircularProgress size={26} color="inherit" />
        ) : (
          <>
            Criar conta
            <ArrowRight size={26} />
          </>
        )}
      </Button>

      {/* LOGIN LINK */}
      <Stack direction="row" justifyContent="center" spacing={1}>
        <Typography color="text.secondary">Já tem uma conta?</Typography>
        <Typography
          color="primary.main"
          fontWeight={600}
          sx={{ cursor: "pointer" }}
          onClick={() => onChagendCurrentPage(CurrentPageEnum.Signin)}
        >
          Fazer login
        </Typography>
      </Stack>

      {/* TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // 👈 AQUI
      >
        <Alert
          severity={toastType}
          onClose={() => setToastOpen(false)}
          sx={{ width: "100%" }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
