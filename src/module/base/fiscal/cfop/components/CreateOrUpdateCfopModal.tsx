import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { bgColorCardsDashBoard, colorOpacity, textFieldStyle } from "../../../../../theme/theme";
import type { CfopDTO } from "../dto/CfopDTO";
import type { CfopEntity } from "../entity/CfopEntity";
import { createCfop, updateCfop } from "../repository/CfopRepository";

const tipoOperacaoOptions = [
  { value: "venda", label: "Venda" },
  { value: "devolucao", label: "Devolução" },
  { value: "estorno", label: "Estorno" },
  { value: "avaria", label: "Avaria" },
  { value: "transferencia", label: "Transferência" },
  { value: "remessa", label: "Remessa" },
  { value: "outros", label: "Outros" },
];

interface CreateOrUpdateCfopModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  cfop: CfopEntity | null;
}

export function CreateOrUpdateCfopModal({
  open,
  onClose,
  onSuccess,
  cfop,
}: CreateOrUpdateCfopModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CfopDTO>();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

  useEffect(() => {
    if (cfop) {
      reset({
        codigo: cfop.codigo ?? "",
        descricao: cfop.descricao ?? "",
        natureza_operacao: cfop.natureza_operacao ?? "",
        tipo_operacao: cfop.tipo_operacao ?? "venda",
        ativo: cfop.ativo,
      });
    } else {
      reset({
        codigo: "",
        descricao: "",
        natureza_operacao: "",
        tipo_operacao: "venda",
        ativo: true,
      });
    }
  }, [cfop, reset]);

  const onSubmit = async (data: CfopDTO) => {
    let result;

    if (cfop === null) {
      result = await createCfop({
        codigo: data.codigo?.trim(),
        descricao: data.descricao?.trim(),
        natureza_operacao: data.natureza_operacao?.trim(),
        tipo_operacao: data.tipo_operacao?.trim(),
        ativo: data.ativo,
      });
    } else {
      const payload: CfopEntity = {
        id: cfop.id,
        codigo: data.codigo?.trim(),
        descricao: data.descricao?.trim(),
        natureza_operacao: data.natureza_operacao?.trim(),
        tipo_operacao: data.tipo_operacao?.trim(),
        ativo: data.ativo,
        data_cadastro: cfop.data_cadastro,
      };
      result = await updateCfop(payload);
    }

    if (!result?.success) {
      setToastType("error");
      setToastMsg(result?.message ?? "Erro ao salvar CFOP.");
      setToastOpen(true);
      return;
    }

    reset();
    onSuccess();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95vw", sm: "90vw", md: 520 },
          maxHeight: "90vh",
          overflowY: "auto",
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
          <Alert severity={toastType} sx={{ width: "100%" }}>
            {toastMsg}
          </Alert>
        </Snackbar>

        <Typography fontSize="1.4rem" fontWeight={700} color="#fff" mb={0}>
          {cfop ? "Editar CFOP" : "Nova CFOP"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2} direction="row" mt={3}>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1}>
                Código
              </Typography>
              <TextField
                placeholder="Ex: 5102"
                {...register("codigo", { required: "Campo obrigatório" })}
                error={!!errors.codigo}
                helperText={errors.codigo?.message}
                inputProps={{ maxLength: 4 }}
                sx={textFieldStyle}
              />
            </Box>

            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1}>
                Tipo de Operação
              </Typography>
              <Controller
                name="tipo_operacao"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <TextField
                    select
                    {...field}
                    value={field.value ?? "venda"}
                    sx={textFieldStyle}
                    error={!!errors.tipo_operacao}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            bgcolor: bgColorCardsDashBoard,
                            borderRadius: 1,
                            color: "#FFF",
                          },
                        },
                      },
                    }}
                  >
                    {tipoOperacaoOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Stack>

          <Box display="flex" flexDirection="column" mt={2}>
            <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1}>
              Natureza da Operação
            </Typography>
            <TextField
              placeholder="Ex: Venda de mercadoria adquirida"
              {...register("natureza_operacao")}
              sx={textFieldStyle}
            />
          </Box>

          <Box display="flex" flexDirection="column" mt={2}>
            <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1}>
              Descrição
            </Typography>
            <TextField
              placeholder="Descrição da CFOP"
              multiline
              rows={2}
              {...register("descricao")}
              sx={textFieldStyle}
            />
          </Box>

          <Box display="flex" flexDirection="column" mt={2}>
            <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1}>
              Status
            </Typography>
            <Controller
              name="ativo"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  sx={textFieldStyle}
                  value={String(field.value)}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          bgcolor: bgColorCardsDashBoard,
                          borderRadius: 1,
                          color: "#FFF",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="true">Ativo</MenuItem>
                  <MenuItem value="false">Inativo</MenuItem>
                </TextField>
              )}
            />
          </Box>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            <Button
              variant="outlined"
              onClick={() => {
                reset();
                onClose();
              }}
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
                px: 3,
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={26} />
              ) : cfop ? (
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
