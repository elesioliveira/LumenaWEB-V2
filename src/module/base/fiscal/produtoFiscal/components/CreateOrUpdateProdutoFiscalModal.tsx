import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { bgColorCardsDashBoard, colorOpacity, textFieldStyle } from "../../../../../theme/theme";
import type { ProdutoFiscalDTO } from "../dto/ProdutoFiscalDTO";
import type { ProdutoFiscalEntity } from "../entity/ProdutoFiscalEntity";
import type { CfopEntity } from "../../cfop/entity/CfopEntity";
import { createProdutoFiscal, updateProdutoFiscal } from "../repository/ProdutoFiscalRepository";

interface CreateOrUpdateProdutoFiscalModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  regra: ProdutoFiscalEntity | null;
  produtoId: number;
  cfops: CfopEntity[];
}

export function CreateOrUpdateProdutoFiscalModal({
  open,
  onClose,
  onSuccess,
  regra,
  produtoId,
  cfops,
}: CreateOrUpdateProdutoFiscalModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProdutoFiscalDTO>();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

  useEffect(() => {
    if (regra) {
      reset({
        produto_id: regra.produto_id,
        cfop_id: regra.cfop_id,
        icms_cst: regra.icms_cst ?? "",
        icms_aliquota: regra.icms_aliquota ?? undefined,
        icms_reducao_bc: regra.icms_reducao_bc ?? undefined,
        pis_cst: regra.pis_cst ?? "",
        pis_aliquota: regra.pis_aliquota ?? undefined,
        cofins_cst: regra.cofins_cst ?? "",
        cofins_aliquota: regra.cofins_aliquota ?? undefined,
        ipi_cst: regra.ipi_cst ?? "",
        ipi_aliquota: regra.ipi_aliquota ?? undefined,
      });
    } else {
      reset({
        produto_id: produtoId,
        cfop_id: 0,
        icms_cst: "",
        icms_aliquota: undefined,
        icms_reducao_bc: undefined,
        pis_cst: "",
        pis_aliquota: undefined,
        cofins_cst: "",
        cofins_aliquota: undefined,
        ipi_cst: "",
        ipi_aliquota: undefined,
      });
    }
  }, [regra, produtoId, reset]);

  const onSubmit = async (data: ProdutoFiscalDTO) => {
    let result;

    const payload: ProdutoFiscalDTO = {
      produto_id: produtoId,
      cfop_id: Number(data.cfop_id),
      icms_cst: data.icms_cst?.trim() || null,
      icms_aliquota: data.icms_aliquota ? Number(data.icms_aliquota) : null,
      icms_reducao_bc: data.icms_reducao_bc ? Number(data.icms_reducao_bc) : null,
      pis_cst: data.pis_cst?.trim() || null,
      pis_aliquota: data.pis_aliquota ? Number(data.pis_aliquota) : null,
      cofins_cst: data.cofins_cst?.trim() || null,
      cofins_aliquota: data.cofins_aliquota ? Number(data.cofins_aliquota) : null,
      ipi_cst: data.ipi_cst?.trim() || null,
      ipi_aliquota: data.ipi_aliquota ? Number(data.ipi_aliquota) : null,
    };

    if (regra === null) {
      result = await createProdutoFiscal(payload);
    } else {
      const updatePayload: ProdutoFiscalEntity = {
        id: regra.id,
        ...payload,
        cfop_codigo: null,
        cfop_descricao: null,
        tipo_operacao: null,
        data_cadastro: regra.data_cadastro,
      };
      result = await updateProdutoFiscal(updatePayload);
    }

    if (!result?.success) {
      setToastType("error");
      setToastMsg(result?.message ?? "Erro ao salvar regra fiscal.");
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
          width: { xs: "95vw", sm: "90vw", md: 680 },
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
          {regra ? "Editar Regra Fiscal" : "Nova Regra Fiscal"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" mt={3}>
            <Typography fontSize="1rem" fontWeight={400} color="#fff" mb={1}>
              CFOP
            </Typography>
            <Controller
              name="cfop_id"
              control={control}
              rules={{ required: "Selecione uma CFOP", validate: (v) => v > 0 || "Selecione uma CFOP" }}
              render={({ field }) => (
                <Autocomplete
                  options={cfops.filter((c) => c.ativo)}
                  getOptionLabel={(option) => `${option.codigo} - ${option.natureza_operacao ?? option.descricao ?? ""}`}
                  value={cfops.find((c) => c.id === field.value) || null}
                  onChange={(_, newValue) => {
                    field.onChange(newValue ? newValue.id : 0);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Selecione a CFOP"
                      sx={textFieldStyle}
                      error={!!errors.cfop_id}
                      helperText={errors.cfop_id?.message}
                    />
                  )}
                  PaperComponent={(props) => (
                    <Box
                      {...props}
                      sx={{
                        bgcolor: bgColorCardsDashBoard,
                        border: "1px solid rgba(40, 61, 107, 0.4)",
                        color: "#FFF",
                      }}
                    />
                  )}
                />
              )}
            />
          </Box>

          <Typography fontSize="1.1rem" fontWeight={600} color="#fff" mt={3} mb={1}>
            ICMS
          </Typography>
          <Stack gap={2} direction={{ xs: "column", md: "row" }}>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="0.85rem" color={colorOpacity} mb={0.5}>
                CST / CSOSN
              </Typography>
              <TextField
                placeholder="Ex: 00, 102, 500"
                {...register("icms_cst")}
                inputProps={{ maxLength: 3 }}
                sx={textFieldStyle}
              />
            </Box>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="0.85rem" color={colorOpacity} mb={0.5}>
                Alíquota (%)
              </Typography>
              <TextField
                placeholder="Ex: 18.00"
                type="number"
                inputProps={{ step: "0.01" }}
                {...register("icms_aliquota")}
                sx={textFieldStyle}
              />
            </Box>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="0.85rem" color={colorOpacity} mb={0.5}>
                Redução BC (%)
              </Typography>
              <TextField
                placeholder="Ex: 33.33"
                type="number"
                inputProps={{ step: "0.01" }}
                {...register("icms_reducao_bc")}
                sx={textFieldStyle}
              />
            </Box>
          </Stack>

          <Typography fontSize="1.1rem" fontWeight={600} color="#fff" mt={3} mb={1}>
            PIS
          </Typography>
          <Stack gap={2} direction={{ xs: "column", md: "row" }}>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="0.85rem" color={colorOpacity} mb={0.5}>
                CST
              </Typography>
              <TextField
                placeholder="Ex: 01, 04, 06"
                {...register("pis_cst")}
                inputProps={{ maxLength: 2 }}
                sx={textFieldStyle}
              />
            </Box>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="0.85rem" color={colorOpacity} mb={0.5}>
                Alíquota (%)
              </Typography>
              <TextField
                placeholder="Ex: 1.6500"
                type="number"
                inputProps={{ step: "0.0001" }}
                {...register("pis_aliquota")}
                sx={textFieldStyle}
              />
            </Box>
          </Stack>

          <Typography fontSize="1.1rem" fontWeight={600} color="#fff" mt={3} mb={1}>
            COFINS
          </Typography>
          <Stack gap={2} direction={{ xs: "column", md: "row" }}>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="0.85rem" color={colorOpacity} mb={0.5}>
                CST
              </Typography>
              <TextField
                placeholder="Ex: 01, 04, 06"
                {...register("cofins_cst")}
                inputProps={{ maxLength: 2 }}
                sx={textFieldStyle}
              />
            </Box>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="0.85rem" color={colorOpacity} mb={0.5}>
                Alíquota (%)
              </Typography>
              <TextField
                placeholder="Ex: 7.6000"
                type="number"
                inputProps={{ step: "0.0001" }}
                {...register("cofins_aliquota")}
                sx={textFieldStyle}
              />
            </Box>
          </Stack>

          <Typography fontSize="1.1rem" fontWeight={600} color="#fff" mt={3} mb={1}>
            IPI
          </Typography>
          <Stack gap={2} direction={{ xs: "column", md: "row" }}>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="0.85rem" color={colorOpacity} mb={0.5}>
                CST
              </Typography>
              <TextField
                placeholder="Ex: 50, 99"
                {...register("ipi_cst")}
                inputProps={{ maxLength: 2 }}
                sx={textFieldStyle}
              />
            </Box>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography fontSize="0.85rem" color={colorOpacity} mb={0.5}>
                Alíquota (%)
              </Typography>
              <TextField
                placeholder="Ex: 5.00"
                type="number"
                inputProps={{ step: "0.01" }}
                {...register("ipi_aliquota")}
                sx={textFieldStyle}
              />
            </Box>
          </Stack>

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
              ) : regra ? (
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
