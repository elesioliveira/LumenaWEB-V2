import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";
import { submitCreateFornecedor, updateFornecedor } from "./repository/FornecedorRepository";
import { getFornecedorByCNPJ } from "./repository/FornecedorRepository";
import { bgColorCardsDashBoard, colorOpacity,textFieldStyle, } from "../../../../theme/theme";

import { maskCNPJ, maskTelefone, unmask } from "../../../../shared/MaskUtils";
import type { FornecedorDTO } from "./dto/FornecedorDTO";
import type { FornecedorEntity } from "./entity/FornecedorEntity";

interface CreateFornecedorModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  fornecedor: FornecedorEntity | null
}

export function CreateFornecedorModal({
  open,
  onClose,
  onSuccess,
  fornecedor
}: CreateFornecedorModalProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FornecedorDTO>();

  const cnpjValue = useWatch({ control, name: "cnpj" });

  const [loadingCnpj, setLoadingCnpj] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

useEffect(() => {
  if (fornecedor) {
    reset({
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      telefone: fornecedor.telefone ?? "",
      email: fornecedor.email ?? "",
      cidade: fornecedor.cidade ?? "",
      bairro: fornecedor.bairro ?? "",
      endereco: fornecedor.endereco ?? "",
    });
  } else {
    reset({
       nome: null,
      cnpj: null,
      telefone: null,
      email: null,
      cidade: null,
      bairro: null,
      endereco: null
    }); //garante modal limpa ao criar novo
  }

}, [fornecedor, reset]);

  /* =========================
     BUSCA CNPJ (BRASIL API)
     ========================= */
  const handleBuscarCnpj = async () => {
    if (!cnpjValue) return;

    const cnpjLimpo = unmask(cnpjValue);

    if (cnpjLimpo.length !== 14) return;

    try {
      setLoadingCnpj(true);

      const result = await getFornecedorByCNPJ(cnpjLimpo);

      if (!result.success) {
        setToastType("error");
        setToastMsg(result.message ?? "CNPJ inválido.");
        setToastOpen(true);
        return;
      }

      const data = result.data;

      setValue("nome", data.razao_social ?? "");
      setValue("email", data.email ?? "");
      setValue("telefone", data.ddd_telefone_1!=null? maskTelefone(data.ddd_telefone_1) : "");
      setValue("cidade", data.municipio ?? "");
      setValue("bairro", data.bairro ?? "");
      setValue(
        "endereco",
        `${data.logradouro ?? ""}, ${data.numero ?? ""} ${data.complemento ?? ""}`.trim()
      );
    } finally {
      setLoadingCnpj(false);
    }
  };

  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: FornecedorDTO) => {
  let result;

  if (fornecedor === null) {
    // 🔹 CREATE
    const payload: FornecedorDTO = {
      nome: data.nome,
      cnpj: data.cnpj,
      telefone: data.telefone ?? null,
      email: data.email ?? null,
      cidade: data.cidade ?? null,
      bairro: data.bairro ?? null,
      endereco: data.endereco ?? null,
    };

    result = await submitCreateFornecedor(payload);
  } else {
    // UPDATE
    const payload: FornecedorEntity = {
      id: fornecedor.id, // vem da entidade selecionada
      nome: data.nome,
      ativo: fornecedor.ativo,
      empresa_id: fornecedor.empresa_id,
      cnpj: data.cnpj,
      telefone: data.telefone ?? null,
      email: data.email ?? null,
      cidade: data.cidade ?? null,
      bairro: data.bairro ?? null,
      endereco: data.endereco ?? null,
    };

    result = await updateFornecedor(payload);
  }

  if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro ao salvar fornecedor.");
    setToastOpen(true);
    return;
  }

  reset();
  onSuccess();
  onClose();
};


  return (
    <Modal open={open} onClose={ onClose}>
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

        <Typography fontSize="1.4rem" fontWeight={700} color="#fff" mb={3}>
          {fornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.2}>
            {/* RAZÃO SOCIAL */}
            <TextField
              placeholder="Nome / Razão Social"
              {...register("nome", { required: "Campo obrigatório" })}
              error={!!errors.nome}
              helperText={errors.nome?.message}
              sx={textFieldStyle}
            />

            {/* CNPJ + TELEFONE */}
            <Stack direction="row" spacing={2}>
              <Controller
                name="cnpj"
                control={control}
                rules={{ required: "CNPJ obrigatório" }}
                render={({ field }) => (
                  <TextField
                    placeholder="CNPJ"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(maskCNPJ(e.target.value))
                    }
                    onBlur={handleBuscarCnpj}
                    error={!!errors.cnpj}
                    helperText={errors.cnpj?.message}
                    sx={textFieldStyle}
                    fullWidth
                    inputProps={{ maxLength: 18 }}
                    InputProps={{
                      endAdornment: loadingCnpj ? (
                        <CircularProgress size={18} />
                      ) : null,
                    }}
                  />
                )}
              />

              <Controller
                name="telefone"
                control={control}
                render={({ field }) => (
                  <TextField
                    placeholder="Telefone"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      if (raw.length <= 11) {
                        field.onChange(maskTelefone(e.target.value));
                      }
                    }}
                    sx={textFieldStyle}
                    fullWidth
                    inputProps={{ maxLength: 15 }}
                  />
                )}
              />
            </Stack>

            {/* EMAIL */}
            <TextField
              placeholder="E-mail"
              {...register("email")}
              sx={textFieldStyle}
            />

            {/* CIDADE + BAIRRO */}
            <Stack direction="row" spacing={2}>
              <TextField
                placeholder="Cidade"
                {...register("cidade")}
                sx={textFieldStyle}
              />
              <TextField
                placeholder="Bairro"
                {...register("bairro")}
                sx={textFieldStyle}
              />
            </Stack>

            {/* ENDEREÇO */}
            <TextField
              placeholder="Endereço"
              {...register("endereco")}
              multiline
              minRows={2}
              sx={textFieldStyle}
            />
          </Stack>

          {/* AÇÕES */}
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
              boxShadow: "0 0 20px rgba(245,159,10,0.35)",
              transition: "0.25s ease",
              "&:hover": {
              background: "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
              boxShadow: "0 0 25px rgba(245,159,10,0.55)",
              transform: "translateY(-1px)",
              },
              color: "#fff",
              fontWeight: 600,
              px: 3,}}>
            {isSubmitting ? (
            <CircularProgress size={26} />
            ) : fornecedor ? (
            "Atualizar"
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
