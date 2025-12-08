import { User, ArrowRight } from "lucide-react";
import { Mail,Building2, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Radio,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import { useAuth } from "../provider/AuthProvider";
import { CurrentPageEnum } from "../enums/CurrentPageEnum";
import { useRegisterController } from "../controller/RegisterController";
import { maskCNPJ } from "../../../shared/MaskUtils";

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
    <Box width="100%" sx={{ py: 4, mt: 0 }}>
      {/* TITULOS */}
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Criar conta
      </Typography>

      <Typography variant="h6" color="text.secondary" mb={2} fontSize="18px">
        Comece a gerenciar seu negócio de forma inteligente
      </Typography>

      {/* INPUTS */}
      {/* Nome completo */}
      <Typography variant="subtitle1" fontWeight="400">
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
        InputProps={{
          sx: {
            height:45,
            fontSize: "1.1rem",
            mb: 2
          },
          startAdornment: (
            <User size={24} style={{ marginRight: "10px", opacity: 0.6 }} />
          )
        }}
      />

      {/* Nome empresa */}
      <Typography variant="subtitle1" fontWeight="400">
        Nome da empresa
      </Typography>
      <TextField
        fullWidth
        placeholder="Sua Empresa LTDA"
        margin="dense"
        variant="outlined"
        value={company.razao_social}
        onChange={(e) => handleChangeCompany("razao_social", e.target.value)}
        InputProps={{
          sx: {
            height:45,
            fontSize: "1.1rem",
            mb: 2
          },
          startAdornment: (
            <Mail size={24} style={{ marginRight: "10px", opacity: 0.6 }} />
          )
        }}
      />
      {/* CNPJ empresa */}
      <Typography variant="subtitle1" fontWeight="400">
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
        InputProps={{
          sx: {
            height:45,
            fontSize: "1.1rem",
            mb: 2,
          },
          startAdornment: (
            <Building2 size={24} style={{ marginRight: "10px", opacity: 0.6 }} />
          )
        }}
      />

      {/* Email */}
      <Typography variant="subtitle1" fontWeight="400">
        Email
      </Typography>
      <TextField
        fullWidth
        placeholder="seu@email.com"
        margin="dense"
        variant="outlined"
        value={company.email}
        onChange={(e) => handleChangeCompany("email", e.target.value)}
        InputProps={{
          sx: {
            height:45,
            fontSize: "1.1rem",
            mb: 2
          },
          startAdornment: (
            <Mail size={24} style={{ marginRight: "10px", opacity: 0.6 }} />
          )
        }}
      />

      {/* SENHA */}
      <Typography variant="subtitle1" fontWeight="400">
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
        InputProps={{
          sx: { height: 45, fontSize: "1.1rem", mb: 2 },
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
          )
        }}
      />

      {/* CONFIRMAR SENHA */}
      <Typography variant="subtitle1" fontWeight="400">
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
        InputProps={{
          sx: { height: 45, fontSize: "1.1rem" },
          startAdornment: (
            <Lock size={24} style={{ marginRight: "10px", opacity: 0.6 }} />
          ),
          endAdornment: (
            <Box
              sx={{ cursor: "pointer", opacity: 0.7 }}
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? <EyeOff size={22} /> : <Eye size={22} />}
            </Box>
          )
        }}
      />

      {/* CHECKBOX TERMOS */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ flexWrap: "wrap" }}>
        <Radio checked />
        <Typography component="span">Eu concordo com os</Typography>
        <Typography component="span" color="primary.main" sx={{ cursor: "pointer" }}>
          Termos de uso
        </Typography>
        <Typography component="span">e</Typography>
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
