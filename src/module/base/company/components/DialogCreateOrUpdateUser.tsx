import { Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { bgColorCardsDashBoard, bordasComponents, colorNegative, colorOpacity, textFieldStyle } from "../../../../theme/theme";
import { X } from "lucide-react";
import { maskCurrency } from "../../../../shared/MaskUtils";
import { fetchClient, fetchFornecedor } from "../../sales/repository/SalesRepository";
import type { User } from "../entities/UsersEntity";
import type { UserDTOAPI, UserDTOForm } from "../dto/ComapnyDTO";
import { FormTextField } from "./FormTextFieldUser";
import { BaseSelect } from "../../wallet/components/SizedSelect";
import { perfilUser } from "../mock/CompanyMocks";
import { submitCreateUser, submitUpdateUser } from "../repository/CompanyRepository";



interface UserProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  user: User | null;
}

export function DialogUser({
  open,
    onClose,
  onSuccess,
  user
}: UserProps) {
const {
  register,
  handleSubmit,
  reset,
  watch,
  formState: { errors, isSubmitting },
} = useForm<UserDTOForm>({
  defaultValues: {
    ativo: false,
    email: "",
    nome: "",
    perfil: null,
  },
});
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [isLoading, setLoading] = useState(false);
const perfilValue = watch("perfil");


useEffect(() => {
  if (user?.id) {
   const p = perfilUser.find((p) => p.label === user.perfil);
    const preLoadData = async () => {
    reset({
      ativo: user.status === "Ativo",
      email: user.email,
      nome: user.nome,
        perfil: p?.value ?? null,
    });
    };

    preLoadData();
  } else {
    reset({
        ativo:null,
        email: null,
        nome: null,
        perfil: null,
    });
  }
}, [user, reset]);






  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: UserDTOForm) => {
try {
    setLoading(true);
    const findPerfil = perfilUser.find((p) => p.value === data.perfil);

    const payload: UserDTOAPI = {
        ativo: true,
        email: data.email?.trim() ??"",
        nome: data.nome?.trim()??"",
        perfil:findPerfil?.label ?? "",
        senha:data.senha ===''? null : data.senha,
    };
    const result =user? await submitUpdateUser(payload, user.id) :  await submitCreateUser(payload);
    if (!result?.success) {
        setToastMsg(result.message ?? "Erro. Contate o administrador.");
        setToastType('error');
        setToastOpen(true);
        return;
    }
    onSuccess();
} catch (error) {
            setToastMsg( "Erro. Contate o administrador.");
        setToastType('error');
        setToastOpen(true);
  } finally {
      setLoading(false);
  }
};




return (
    <>
      {/* TOAST */}
  <Snackbar
    open={toastOpen}
    autoHideDuration={1000}
    onClose={() => setToastOpen(false)}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}>
    <Alert severity={toastType} sx={{ width: "100%" }}>
      {toastMsg}
    </Alert>
  </Snackbar>

<Dialog
  open={open}
  onClose={() => {
    reset();
    onClose();
  }}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      bgcolor: bgColorCardsDashBoard,
      borderRadius: 2,
      border: "1px solid rgba(40, 61, 107, 0.4)",
    },
  }}
>
  {/* HEADER */}
  <DialogTitle
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#fff",
      fontSize: "1.4rem",
      fontWeight: 700,
      px: 4,
      pt: 3,
      pb: 2,
    }}
  >
    <Stack display={"flex"} width={"100%"} minHeight={0} flexDirection={"row"} alignContent={"start"} alignItems={"start"} justifyContent={"space-between"} justifyItems={"start"}>
        <Box display={"flex"} flexDirection={"column"} minHeight={0}>
            <Typography fontWeight={600} fontSize={"1.4rem"} color={"white"}>
            {user ? "Editar Usuário" : "Novo Usuário"}
            </Typography>
            <Typography fontWeight={300} fontSize={"1rem"} color={colorOpacity}>
            Preencha os dados para criar um novo usuário.
            </Typography>
        </Box>
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

  </DialogTitle>

  {/* CONTENT */}
  <DialogContent
    dividers
    sx={{
      px: 4,
      py: 3,
      color: "#fff",
    }}
  >
{isLoading? (
  <CircularProgress size={32} color="inherit" />
) : (<form onSubmit={handleSubmit(onSubmit)} id="user-form">
    <FormTextField
    label="Nome*"
    name="nome"
    placeholder="Digite o nome completo"
    multiline
    rows={1}
    register={register}
    errors={errors}
    sx={{...textFieldStyle, mb:3}}
    />
    <FormTextField
    label="Email*"
    name="email"
    placeholder="Digite o email de acesso"
    multiline
    rows={1}
    register={register}
    errors={errors}
    sx={{...textFieldStyle, mb:3}}
    />
    <Stack display={"flex"} flexDirection={"row"} gap={2} width={"100%"} minHeight={0}>
    <FormTextField
    label="Senha*"
    name="senha"
    type="password"
    placeholder="Digite sua senha"
    register={register}
    errors={errors}
    sx={{ ...textFieldStyle, mb: 3 }}
    />
    <FormTextField
    label="Confirme Senha*"
    name="confirmarSenha"
    type="password"
    placeholder="Confirme sua senha"
    register={register}
    errors={errors}
    sx={{ ...textFieldStyle, mb: 3 }}
    rules={{
        validate: (value) =>
        value === watch("senha") || "As senhas não coincidem",
    }}
    />
    </Stack>
  <BaseSelect
    label="Perfil*"
    fullWidth
    error={!!errors.perfil}
    value={perfilValue ?? ""}
    helperText={errors.perfil?.message}
    {...register("perfil", {
      required: "Perfil é obrigatório",
      valueAsNumber: true, // 👈 ISSO AQUI
    })}
    SelectProps={{
    MenuProps: {
        PaperProps: {
        sx: {
            bgcolor: bgColorCardsDashBoard,
            borderRadius: 1,
            color: "#fff",
        },
        },
    },
    }}
    options={perfilUser.map((p) => ({
        value: p.value,
        label: p.label,
    }))}
    />
</form>)}

  </DialogContent>
  {/* ACTIONS */}
  <DialogActions
    sx={{
      px: 4,
      py: 3,
      borderTop: "1px solid rgba(40, 61, 107, 0.4)",
      bgcolor: bgColorCardsDashBoard,
      gap:2
    }}
  >
    <Button
      variant="outlined"
      onClick={() => {
        reset();
        onClose();
      }}
      sx={{
        width: 150,
        color: colorOpacity,
        border: "1px solid rgba(40, 61, 107, 0.6)",
      }}
    >
      Cancelar
    </Button>

    <Button
      type="submit"
      form="user-form"
      disabled={isSubmitting}
      sx={{
        width: 200,
        background: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
        boxShadow: "0 0 20px rgba(245,159,10,0.35)",
        transition: "0.25s ease",
        "&:hover": {
          background: "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
          boxShadow: "0 0 25px rgba(245,159,10,0.55)",
          transform: "translateY(-1px)",
        },
        color: "#fff",
        fontWeight: 600,
        px: 3,
      }}
    >
      {isSubmitting ? (
        <CircularProgress size={26} />
      ) : user ? (
        "Atualizar"
      ) : (
        "Salvar"
      )}
    </Button>
  </DialogActions>
</Dialog>

    </>
);
}
