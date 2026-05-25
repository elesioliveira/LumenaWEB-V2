
  import {  Ban, Building2, ChevronLeft, ChevronRight, Eye,  Mail,  MapPin,  Pencil, Plus, Save, ShoppingCart, } from "lucide-react";
  import {
  Box,
  Typography,
  Stack,
  Snackbar,
  Alert,
  MenuItem,
   useMediaQuery,
   useTheme,
   TextField,
   CircularProgress,
  } from "@mui/material";
  import { useEffect, useRef, useState } from "react";
import { bgComponents, bordasComponents, colorOpacity, textFieldStyle } from "../../../../theme/theme";
import { PrimaryActionButton } from "../../../../shared/PrimaryActionButtonProps";
import { useForm, useWatch } from "react-hook-form";
import type { CompanyFORMDTO } from "../dto/ComapnyDTO";
import { FormTextField } from "../components/FormTextField";
import { fetchDetailsCompany } from "../repository/CompanyRepository";
import { updateCompany } from "../repository/CompanyRepositoryFromForm";
import { fetchEnderecoByCep } from "../../client/repository/ClientRepository";
import { maskCEP, maskTelefone } from "../../../../shared/MaskUtils";
import { SecondaryActionButton } from "../../../../shared/SecondaryActionButton";
import { urlBase, urlImages } from "../../../../shared/HttpManager";
import { useResponsive } from "../../../../shared/useResponsive";







export function DetailsCompanyTab() {
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(true);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const { isMobile } = useResponsive();
const [logoPreview, setLogoPreview] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement | null>(null);
const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
const [editar, setEditar] = useState<boolean>(false);
const {
  register,
  handleSubmit,
  reset,
  control,
  setValue, // mantém, caso precise pontualmente
} = useForm<CompanyFORMDTO>({
  defaultValues: {
    razao: null,
    fantasia: null,
    cnpj: null,
    ie: null,
    im: null,
    email: null,
    telefone: null,
    celular: null,
    website: null,
    cep: null,
    logradouro: null,
    numero: null,
    complemento: null,
    bairro: null,
    cidade: null,
    uf: null,
    observacao: null,
  },
});

const handleSelectLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  setSelectedLogoFile(file);
  setLogoPreview(URL.createObjectURL(file));
};

const handleOpenFilePicker = () => {
  fileInputRef.current?.click();
};

const fetchCompany = async () => {
  setLoading(true);

  try {
    const result = await fetchDetailsCompany();

    if (!result?.success) {
      setToastMsg(result.message ?? "Erro.");
      setToastType("error");
      setToastOpen(true);
      return;
    }
    const data = result.data;
    reset({
      razao: data.razao_social ?? null,
      fantasia: data.fantasia ?? null,
      cnpj: data.cnpj ?? null,
      ie: data.ie ?? null,
      im: data.im ?? null,
      email: data.email ?? null,
      telefone: data.telefone ?? null,
      celular: data.celular ?? null,
      website: data.website ?? null,
      cep: data.cep ?? null,
      logradouro: data.logradouro ?? null,
      numero: data.numero ?? null,
      complemento: data.complemento ?? null,
      bairro: data.bairro ?? null,
      cidade: data.cidade ?? null,
      uf: data.uf ?? null,
      observacao: data.observacao ?? null,
    });
    if (result.data.logo) {
    setLogoPreview(`${urlImages}${result.data.logo}`);
    } else {
    setLogoPreview(null);
    }
  } catch (error) {
    setToastMsg("Erro.");
    setToastType("error");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};

const onSubmit = async (formData: CompanyFORMDTO) => {
  setLoading(true);

  try {
    const result = await updateCompany({
      data: formData,
      logo: selectedLogoFile, // File | null
    });

    if (!result?.success) {
      setToastMsg(result.message ?? "Erro ao salvar.");
      setToastType("error");
      setToastOpen(true);
      return;
    }

    setToastMsg("Empresa atualizada com sucesso.");
    setToastType("success");
    setToastOpen(true);
  } catch {
    setToastMsg("Erro ao salvar.");
    setToastType("error");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};


const handleFetchCep = async (cep?: string) => {
  if (!cep) return;

  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) return;

  try {
    setLoading(true);

    const result = await fetchEnderecoByCep(cepLimpo);

    setValue("bairro", result.neighborhood ?? "");
    setValue("cidade", result.city ?? "");
    setValue("logradouro", result.street ?? "");
    setValue("uf", result.state ?? "");
  } catch {
    setToastType("error");
    setToastMsg("Erro ao buscar endereço pelo CEP.");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};



useEffect(()=> {
    fetchCompany();
},[]);


    return (
    <>

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
    <Box flexDirection={"column"} mr={2}>
    <Box display={"flex"} flexDirection={"column"} flexGrow={2} ml={2}>
    <Box display={"flex"} flexDirection={"column"}>
      <Stack display={"flex"} flexDirection={"row"} width={"100%"} minHeight={0} alignContent={"center"} justifyContent={"space-between"}>
        <Box display={"flex"} flexDirection={"column"}>
              <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
              Dados da Empresa
              </Typography>
              <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
              Gerencie as informações cadastrais da sua empresa
              </Typography>
        </Box>
    <Stack display={"flex"} flexDirection={"row"} alignContent={"center"} alignItems={"center"} justifyContent={"center"} justifyItems={"center"} gap={4}>
      {editar && (
        <SecondaryActionButton
          label="Cancelar"
          type="button"
          sx={{
              width: "200px",
              height: 50,
              mt: "auto",
          }}
          onClick={() => setEditar(false)}
          />
        )}
        <PrimaryActionButton
          label={editar ? "Salvar" : "Editar"}
          type= {editar? "submit" :"button"}
          boxShadow="0 0 20px rgba(245,159,10,0.35)"
          background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
          startIcon={editar? <Save/> :<Plus />}
          sx={{
          width: "200px",
          height: 50,
          mt: "auto",
          }}
        onClick={() => {
        if (!editar) {
        setEditar(true); // entra em modo edição
        return;
        }
        //  DISPARA O SUBMIT DO FORM
        handleSubmit(onSubmit)();
        }}
        />
    </Stack>
      </Stack>
    </Box>
    {loading ? (
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        width="100%"
        >
        <CircularProgress size={48} />
        </Box>
    ) : (
   <form onSubmit={handleSubmit(onSubmit)}>
    <Box display={"grid"}  gridTemplateColumns={isMobile ? "1fr" : "1fr 2fr"} gap={2} flexGrow={1} width={"100%"} minHeight={0}>
        <Box
        display="flex"
        flexDirection="column"
        border={bordasComponents}
        mt={5}
        borderRadius={1}
        p={4}
        >
        <Stack direction="row" gap={2} alignItems="center">
            <Building2 size={33} />
            <Typography fontWeight={600} fontSize="1.6rem" color="white">
            Logo da Empresa
            </Typography>
        </Stack>

        <Typography fontWeight={300} fontSize="1rem" color={colorOpacity}>
            Imagem que será exibida nos documentos
        </Typography>

        <Box
            width="100%"
            minHeight="500px"
            bgcolor={bgComponents}
            mt={4}
            borderRadius={1}
            display="flex"
            flexDirection="column"
            p={3}
        >
            {/* CONTEÚDO CENTRAL (TERNÁRIO) */}
            <Box
            flex={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
            >
            {logoPreview ? (
                <img
                src={logoPreview}
                alt="Logo da empresa"
                style={{
                    maxWidth: "100%",
                    maxHeight: 250,
                    objectFit: "contain",
                }}
                />
            ) : (
                <>
                <Building2 color={colorOpacity} size={58} />
                <Typography fontSize="1rem" fontWeight={300} color={colorOpacity}>
                    Nenhuma logo definida
                </Typography>
                </>
            )}
            </Box>

            {/* 🔹 INPUT FILE (OCULTO) */}
            <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleSelectLogo}
            />

            {/* 🔹 BOTÃO */}
            <PrimaryActionButton
            label={logoPreview ? "Alterar Logo" : "Adicionar Logo"}
            boxShadow="0 0 20px rgba(245,159,10,0.35)"
            background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
            startIcon={<Plus />}
            sx={{
                width: "100%",
                height: 50,
                mt: "auto",
            }}
            onClick={handleOpenFilePicker}
            />
        </Box>
        </Box>
         <Box display={"flex"} flexDirection={"column"} border={bordasComponents} mt={5} borderRadius={1} p={4}>
            <Typography fontWeight={600} fontSize={"1.6rem"} color={"white"}>
                Informações Principais
            </Typography>
            <Typography fontWeight={300} fontSize={"1rem"} color={colorOpacity}>
                Dados cadastrais básicos da empresa
            </Typography>
            <Box
            display="grid"
            gridTemplateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
            gap={2}
            mt={4}
            >
            <FormTextField
            label="Razão Social"
            required
            placeholder="Razão social"
            register={register("razao", { required: "Campo obrigatório" })}
            sx={textFieldStyle}
            disabled={!editar}
            />
            <FormTextField
            label="Nome Fantasia"
            required
            placeholder="Nome Fantasia"
            register={register("fantasia", { required: "Campo obrigatório" })}
            sx={textFieldStyle}
            disabled={!editar}
            />
            <FormTextField
            label="CNPJ"
            required
            placeholder="00.000.000/0000-00"
            register={register("cnpj", { required: "Campo obrigatório" })}
            sx={textFieldStyle}
            disabled={!editar}
            />
            <FormTextField
            label="Inscrição Estadual"
            placeholder="000.000.000.000"
            register={register("ie",)}
            sx={textFieldStyle}
            disabled={!editar}
            />
            <FormTextField
            label="Inscrição Municipal"
            placeholder="IM"
            register={register("im", )}
            sx={textFieldStyle}
            disabled={!editar}
            />
            </Box>
         </Box>
    </Box>
    <Box display={"grid"}  gridTemplateColumns={isMobile ? "1fr" : "1fr 2fr"} gap={2} flexGrow={1} width={"100%"} minHeight={0}>
        <Box display={"flex"} flexDirection={"column"} border={bordasComponents} mt={5} borderRadius={1} p={4}>
            <Stack display={"flex"} flexDirection={"row"} width={"100%"} minHeight={0} alignContent={"center"} justifyContent={"flex-start"} gap={2}>
                <Mail size={33}/>
                <Typography fontWeight={600} fontSize={"1.6rem"} color={"white"}>
                    Contato
                </Typography>
            </Stack>
            <Typography fontWeight={300} fontSize={"1rem"} color={colorOpacity}>
                Informações de contato da empresa
            </Typography>
             <Box display={"grid"}  gridTemplateColumns={"1fr"} gap={2} flexGrow={1} width={"100%"} minHeight={0} mt={4}>
                <FormTextField
                label="E-mail"
                required
                type="email"
                placeholder="elesio@gmail.com"
                register={register("email", { required: "Campo obrigatório" })}
                sx={textFieldStyle}
                disabled={!editar}
                />
                <FormTextField
                label="Telefone"
                disabled={!editar}
                required
                placeholder="(11) 3456-7890"
                register={register("telefone", {
                required: "Campo obrigatório",
                onChange: (e) => {
                const masked = maskTelefone(e.target.value);
                e.target.value = masked; // 🔹 atualiza o input
                },
                })}
                sx={textFieldStyle}
                />
                <FormTextField
                disabled={!editar}
                label="Celular"
                required
                placeholder="(11) 3456-7890"
                register={register("celular", {
                required: "Campo obrigatório",
                onChange: (e) => {
                const masked = maskTelefone(e.target.value);
                e.target.value = masked; // 🔹 atualiza o input
                },
                })}
                sx={textFieldStyle}
                />
                <FormTextField
                disabled={!editar}
                label="Website"
                placeholder="www.lumena.com.br"
                register={register("website", )}
                sx={textFieldStyle}
                />
             </Box>
        </Box>
         <Box display={"flex"} flexDirection={"column"} border={bordasComponents} mt={5} borderRadius={1} p={4}>
            <Stack display={"flex"} flexDirection={"row"} gap={1} alignContent={"center"} justifyContent={"start"} justifyItems={"center"} alignItems={"center"}>
            <MapPin color={colorOpacity}/>
            <Typography fontWeight={600} fontSize={"1.6rem"} color={"white"}>
                Endereço
            </Typography>
            </Stack>
            <Typography fontWeight={300} fontSize={"1rem"} color={colorOpacity}>
                Localização física da empresa
            </Typography>
            <Box
            display="grid"
            gridTemplateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
            gap={2}
            mt={4}
            >
            <FormTextField
            disabled={!editar}
            label="Cep"
            required
            placeholder="00000-000"
            register={register("cep", {
            required: "Campo obrigatório",
            onChange: (e) => {
            const masked = maskCEP(e.target.value);
            e.target.value = masked; // atualiza o input
            if (masked.replace(/\D/g, "").length === 8) {
            handleFetchCep(masked);
            }
            },
            })}
            sx={textFieldStyle}
            />
            <FormTextField
            disabled={!editar}
            label="Logradouro"
            required
            placeholder="Av. Paulista"
            register={register("logradouro", { required: "Campo obrigatório" })}
            sx={textFieldStyle}
            />
            <FormTextField
            disabled={!editar}
            label="Número"
            required
            placeholder="1000"
            register={register("numero", { required: "Campo obrigatório" })}
            sx={textFieldStyle}
            />
            <FormTextField
            disabled={!editar}
            label="Complemento"
            placeholder="Sala 1001"
            register={register("complemento",)}
            sx={textFieldStyle}
            />
            <FormTextField
            disabled={!editar}
            label="Bairro"
            required
            placeholder="Bela Vista"
            register={register("bairro", { required: "Campo obrigatório" })}
            sx={textFieldStyle}
            />
            <FormTextField
            disabled={!editar}
            label="Cidade"
            required
            placeholder="São Paulo"
            register={register("cidade", { required: "Campo obrigatório" })}
            sx={textFieldStyle}
            />
            <FormTextField
            disabled={!editar}
            label="Estado"
            required
            placeholder="UF"
            register={register("uf", { required: "Campo obrigatório" })}
            sx={textFieldStyle}
            />
            </Box>
         </Box>

    </Box>
    <Box display={"flex"} flexDirection={"column"} width={"100%"} minHeight={0} gap={1} border={bordasComponents}p={4} mt={4} borderRadius={1} mb={2}>
        <Typography fontWeight={600} fontSize={"1.4rem"} color={"white"}>
            Observações
        </Typography>
        <Typography fontWeight={300} fontSize={"1rem"} color={colorOpacity}>
            Informações adicionais sobre a empresa
        </Typography>
            <FormTextField
            disabled={!editar}
            label=""
            placeholder="Adicione observações ou informações adicionais..."
            register={register("observacao",)}
            sx={textFieldStyle}
            row={4}
            />
    </Box>
    </form>
    )}
    </Box>
    </Box>
    </>
    );
    }