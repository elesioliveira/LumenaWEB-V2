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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { bgColorCardsDashBoard, bordasComponents, colorNegative, colorOpacity, textFieldStyle } from "../../../../theme/theme";
import { X } from "lucide-react";
import type {  ContaReceberFormDTO, NovaContaDTO } from "../dto/WalletDTO";
import { paymentTypesMock } from "../mocks/WalletMocks";
import { fetchClienteCategoria, fetchFornecedorCategoria, fetchWalletCategoria, postSubmitNewConta, putSubmitUpdateConta } from "../repository/WalletRepository";
import type { CategoriaWalletFormEntity, ClientesWalletFormEntity, ContaReceberEntity, FornecedorWalletFormEntity } from "../entity/WalletEntity";
import { maskCurrency } from "../../../../shared/MaskUtils";
import { fetchClient, fetchFornecedor } from "../../sales/repository/SalesRepository";
import { BaseSelect } from "./SizedSelect";



interface CreateOrUpdateContarPagarProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  conta: ContaReceberEntity | null;
}

export function CreateOrUpdateContaPagar({
  open,
    onClose,
  onSuccess,
  conta
}: CreateOrUpdateContarPagarProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue, 
  control,
    formState: { errors, isSubmitting },
  } = useForm<ContaReceberFormDTO>({});
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [fornecedores, setFornecedores] = useState<FornecedorWalletFormEntity[]>([]);
  const [categorias, setCategorias] = useState<CategoriaWalletFormEntity[]>([]);
  const [tipoPagamento, setTipoPagamento] = useState<string |null>("");
  const [isLoading, setLoading] = useState(false);
  const searchRef = useRef("");
  const searchCategoriaRef = useRef("");
  const debounceRef = useRef<number | null>(null);
//METODOS
const handleSearchCategoriaChange = (value: string) => {
  searchCategoriaRef.current = value;

  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  if (!value || value.trim().length < 2) {
    setCategorias([]);
    return;
  }

  debounceRef.current = window.setTimeout(() => {
    fetchWalletCategorias(searchCategoriaRef.current);
  }, 500);
};
const handleSearchChange = (value: string) => {
  searchRef.current = value;

  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  if (!value || value.trim().length < 2) {
    setFornecedores([]);
    return;
  }

  debounceRef.current = window.setTimeout(() => {
    fetchFornecedores(searchRef.current);
  }, 500);
};

//API
const fetchFornecedores = async (search: string) => {
  setLoading(true);
  try {
    const result = await fetchFornecedor(search);
    if (!result?.success) {
      setToastType("error");
      setToastMsg(result?.message ?? "Erro ao buscar fornecedores.");
      setToastOpen(true);
      return;
    }
    setFornecedores(result.data);
  } catch {
    setToastType("error");
    setToastMsg("Erro ao buscar fornecedores.");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};


const fetchWalletCategorias = async (search: string) => {
  setLoading(true);
  try {
    const result = await fetchWalletCategoria(search,'Despesa');
    if (!result?.success) {
      setToastType("error");
      setToastMsg(result?.message ?? "Erro ao buscar categoria.");
      setToastOpen(true);
      return;
    }
    setCategorias(result.data);
  } catch {
    setToastType("error");
    setToastMsg("Erro ao buscar categoria.");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};

const fetchUpdateForm = async (id_cliente: number, id_categoria: number, id_fornecedor: number | null) => {
  try {
    setLoading(true);

    const result = id_fornecedor? await fetchFornecedorCategoria(id_fornecedor, id_categoria) : await fetchClienteCategoria(id_cliente, id_categoria);

    if (!result?.success) {
      setToastType("error");
      setToastMsg(result?.message ?? "Erro.");
      setToastOpen(true);
      return;
    }
if (id_fornecedor) {
  setFornecedores(result.data.fornecedor ? [result.data.fornecedor] : []);
}else{
 setFornecedores(result.data.cliente ? [result.data.cliente] : []);
}
    
    setCategorias(result.data.categoria ? [result.data.categoria] : []);

  } catch {
    setToastType("error");
    setToastMsg("Erro ao buscar cliente.");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (conta?.cliente_id || conta?.fornecedor_id) {
    const preLoadData = async () => {
      await fetchUpdateForm(conta.cliente_id!, conta.categoria_id!, conta.fornecedor_id);

      reset({
        descricao: conta.descricao,
        cliente_id: conta.cliente_id,
        fornecedor_id: conta.fornecedor_id,
        categoria_id: conta.categoria_id,
        vencimento: conta.vencimento,
        valor: maskCurrency(conta.valor),
        tipo_pagamento: conta.tipo_pagamento,
        observacao: conta.observacao,
      });
    };

    preLoadData();
  } else {
    reset({
      descricao: "",
      cliente_id: null,
      categoria_id: null,
      vencimento: "",
      valor: "",
      tipo_pagamento: "",
      observacao: "",
    });
  }
}, [conta, reset]);






  /* =========================
     SUBMIT
     ========================= */
const onSubmit = async (data: ContaReceberFormDTO) => {
  if (!data.tipo_pagamento) {
  setToastType("error");
  setToastMsg("Tipo de pagamento é obrigatório");
  setToastOpen(true);
  return;
}
try {
     let result;
  const payload : NovaContaDTO = {
    descricao: data.descricao?.trim() ?? null,
    categoria_id: data.categoria_id,
    cliente_id: null,
    data_vencimento: data.vencimento ?? null,
    fornecedor_id: data.fornecedor_id,
    observacao: data.observacao?.trim() ?? null,
    origem_tipo: "Conta a Pagar",
    status:conta? conta.status : "Pendente",
    tipo_pagamento: data.tipo_pagamento ?? null,
    valor_total: Number(data.valor!.replaceAll("R\$","").replaceAll(".","").replaceAll(",","."))
  };



  // Persistência
  if (!conta) {
    result = await postSubmitNewConta(payload);
  } else {
    result = await putSubmitUpdateConta(payload, conta.id);
  }

  // 4️⃣ Feedback
  if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro. Contate o administrador.");
    setToastOpen(true);
    return;
  }

  reset();
  await onSuccess();
  onClose();
} catch (error) {
    setToastType("error");
    setToastMsg( "Erro. Contate o administrador.");
    setToastOpen(true);
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
    {conta ? "Editar Conta a Receber" : "Nova Conta a Receber"}

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
    <form onSubmit={handleSubmit(onSubmit)} id="category-form">
      <Typography
        color={colorOpacity}
        fontWeight={300}
        fontSize="1rem"
        mb={1}
      >
        Descrição*
      </Typography>
      <TextField
        fullWidth
        placeholder="Descrição da conta a receber"
        inputMode="text"
        required
        error={!!errors.descricao}
        helperText={errors.descricao?.message}
        {...register("descricao", {
          required: "Descrição é obrigatória",
        })}
        sx={textFieldStyle}
      />
      <Box
        display="grid"
        gridTemplateColumns={{xs: "1fr",sm: "repeat(2, 1fr)",}}
        gap={2}
        mt={4}
        >
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography fontWeight={300} fontSize="1rem" color={colorOpacity}>Fornecedor*</Typography>
          <Controller
          name="fornecedor_id"
          control={control}
          rules={{ required: true }}
          render={({field, fieldState }) => (
             <Autocomplete<FornecedorWalletFormEntity, false, false, false>
              {...field}
              options={fornecedores}
              loading={isLoading}
             value={fornecedores.find(c => c.id === field.value) ?? null}
              onInputChange={(_, value, reason) => {
                if (reason === "input") {
                  handleSearchChange(value);
                }
              }}
            onChange={(_, value) => {
                  field.onChange(value?.id ?? null); // ESSENCIAL
                }}
              getOptionLabel={(option) => option.nome}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? "Fornecedor é obrigatório" : ""}
                  placeholder="Buscar por fornecedor..."
                  sx={textFieldStyle}
                />
                )} 
                PaperComponent={(props) => (
                <Box
                  {...props}
                  sx={{
                    bgcolor: bgColorCardsDashBoard,
                    border: bordasComponents,
                    color: "#fff",
                  }}
                />
              )}/>
          )}
        />
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography fontWeight={300} fontSize="1rem" color={colorOpacity}>Categoria*</Typography>
          <Controller
          name="categoria_id"
          control={control}
          rules={{ required: true }}
          render={({field, fieldState}) => (
             <Autocomplete<CategoriaWalletFormEntity, false, false, false>
              {...field}
              options={categorias}
              loading={isLoading}
              value={categorias.find(c => c.id === field.value) ?? null}
              onInputChange={(_, value, reason) => {
                if (reason === "input") {
                  handleSearchCategoriaChange(value);
                }
              }}
              onChange={(_, value) => {
                field.onChange(value?.id ?? null); // ESSENCIAL
              }}
              getOptionLabel={(option) => option.nome}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? "Categoria é obrigatório" : ""}
                  placeholder="Buscar por categorias..."
                  sx={textFieldStyle}
                />
                )} 
                PaperComponent={(props) => (
                <Box
                  {...props}
                  sx={{
                    bgcolor: bgColorCardsDashBoard,
                    border: bordasComponents,
                    color: "#fff",
                  }}
                />
              )}/>
          )}
        />
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography fontWeight={300} fontSize="1rem" color={colorOpacity}>Valor*</Typography>
          <Controller
            name="valor"
            control={control}
            rules={{ required: "Valor é obrigatório" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder="R$ 0,00"
                inputMode="numeric"
                onChange={(e) => {
                  const masked = maskCurrency(e.target.value);
                  field.onChange(masked);
                }}
                sx={textFieldStyle}
              />
            )}
          />
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography fontWeight={300} fontSize="1rem" color={colorOpacity}>Vecimento*</Typography>
          <Controller
            name="vencimento"
            control={control}
            rules={{ required: "Vencimento é obrigatório" }}
            render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="date"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
                ...textFieldStyle,

                // cor do texto
                input: {
                  color: "#fff",
                },

                // ícone do calendário (Chrome / Edge)
                "& input::-webkit-calendar-picker-indicator": {
                  filter: "invert(1)",
                  cursor: "pointer",
                  color: "#fff",
                },
              }}
            />
            )}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap={0.5} mt={2}>
        <Typography fontWeight={300} fontSize="1rem" color={colorOpacity}>
          Tipo de pagamento*
        </Typography>

        <Controller
          name="tipo_pagamento"
          control={control}
          rules={{ required: "Tipo de pagamento é obrigatório" }}
          render={({ field, fieldState }) => (
            <BaseSelect
              {...field}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              options={paymentTypesMock.map((status) => ({
                value: status,
                label: status,
              }))}
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
            />
          )}
        />
      </Box>
        <Box display={"flex"} flexDirection={"column"} gap={0.5} mt={2}>
          <Typography fontWeight={300} fontSize="1rem" color={colorOpacity}>Observação</Typography>
          <Controller
            name="observacao"
            control={control}
            render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="search"
              multiline
              rows={2}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
                ...textFieldStyle,

                // cor do texto
                input: {
                  color: "#fff",
                },

                // ícone do calendário (Chrome / Edge)
                "& input::-webkit-calendar-picker-indicator": {
                  filter: "invert(1)",
                  cursor: "pointer",
                  color: "#fff",
                },
              }}
            />
            )}
          />
        </Box>
    </form>
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
      form="category-form"
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
      ) : conta ? (
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
