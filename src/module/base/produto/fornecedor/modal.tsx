import { Controller } from "react-hook-form"; 
import { Alert, Box, Button, CircularProgress, Modal, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import type { FornecedorDTO } from "./dto/FornecedorDTO";
import { submitCreateFornecedor } from "./repository/FornecedorRepository";
import { useSessionController } from "../../../auth/controller/SessionController";
import { bgColorCardsDashBoard, colorOpacity, textFieldStyle } from "../../../../theme/theme";
import { maskCNPJ, maskTelefone } from "../../../../shared/MaskUtils";
import { useState } from "react";
interface CreateFornecedorModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


export function CreateFornecedorModal({ open, onClose,onSuccess,}: CreateFornecedorModalProps) {
  const { user } = useSessionController();
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");

  const {
    register,
    handleSubmit,
     control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FornecedorDTO>();

const onSubmit = async (data: FornecedorDTO) => {
  if (!user) return;

  const payload: FornecedorDTO = {
    empresa_id: user.empresaid,
    razao_social: data.razao_social,
    cnpj: data.cnpj,
    telefone: data.telefone ?? null,
    email: data.email ?? null,
    cidade: data.cidade ?? null,
    bairro: data.bairro ?? null,
    endereco: data.endereco ?? null,
  };

  const result = await submitCreateFornecedor(payload);

  if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao cadastrar fornecedor.");
    setToastOpen(true);
    return;
  }
  reset();
  onClose();

  onSuccess(); //  AVISA A VIEW
};




  return (
    
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 520,
          bgcolor: bgColorCardsDashBoard,
          borderRadius: 2,
          border: "1px solid rgba(40, 61, 107, 0.4)",
          p: 4,
        }}
      >
        <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert
        severity={toastType}
        onClose={() => setToastOpen(false)}
        sx={{ width: "100%" }}
        >
        {toastMsg}
        </Alert>
        </Snackbar>
        <Typography fontSize="1.4rem" fontWeight={700} color="#fff" mb={3}>
          Novo Fornecedor
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.2}>
            <TextField
              label="Nome / Razão Social"
              {...register("razao_social", { required: "Campo obrigatório" })}
              error={!!errors.razao_social}
              helperText={errors.razao_social?.message}
              sx={textFieldStyle}
            />
            <Stack direction="row" spacing={2}>
            <Controller
                  name="cnpj"
                  control={control}
                  rules={{ required: "CNPJ obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      label="CNPJ"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(maskCNPJ(e.target.value))
                      }
                      error={!!errors.cnpj}
                      helperText={errors.cnpj?.message}
                      sx={textFieldStyle}
                      fullWidth
                      inputProps={{
                        maxLength: 18, // 👈 limite correto do CNPJ formatado
                      }}
                    />
                  )}
                />
              <Controller
                name="telefone"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Telefone"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      if (raw.length <= 11) {
                        field.onChange(maskTelefone(e.target.value));
                      }
                    }}
                    sx={textFieldStyle}
                    fullWidth
                    inputProps={{
                      maxLength: 15, // (99) 99999-9999
                    }}
                  />
                )}
              />  
            </Stack>

            <TextField
              label="E-mail"
              {...register("email")}
              sx={textFieldStyle}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Cidade"
                {...register("cidade")}
                sx={textFieldStyle}
              />
              <TextField
                label="Bairro"
                {...register("bairro")}
                sx={textFieldStyle}
              />
            </Stack>

            <TextField
              label="Endereço"
              {...register("endereco")}
              multiline
              minRows={2}
              sx={textFieldStyle}
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: colorOpacity,
                border: "1px solid rgba(40, 61, 107, 0.6)",
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                background: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
                color: "#fff",
                fontWeight: 600,
                px: 3,
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={26} color="inherit" />
              ) : (
                "Salvar"
              )}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
