import Decimal from "decimal.js";
import {  Package, Save, ShoppingCart, Trash2} from "lucide-react";
  import {
  Box,
  Typography,
  Stack,
  TextField,
  Snackbar,
  Alert,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  } from "@mui/material";
  import { useEffect, useMemo, useRef, useState } from "react";
import { bgColorCardsDashBoard, bordasComponents,colorNegative,colorOpacity, hoverGlow, primaryColor, textFieldStyle } from "../../../theme/theme";
import type { Canais, ClientSalesEntity, Entrega, FormSalesEntity, ProductSalesEntity } from "./entity/SalesEntity";
import {  typeOfStatusListNewSales } from "./mocks/SalesMocks";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { cellStyle, cellStyleBold } from "../../../theme/cellTable";
import { maskCurrency } from "../../../shared/MaskUtils";
import type { EstoqueItem } from "../stock/dto/StockDTO";
import { PrimaryActionButton } from "../../../shared/PrimaryActionButtonProps";
import { fetchClient, fetchFormSale, fetchProductByGtinOrNameSales, submitNewSale, updateSubmitSale } from "./repository/SalesRepository";
import type { NewSaleDTO, SaleItensFormDTO } from "./dto/SaleDTO";
import { useSales } from "./provider/SalesProvider";
import { CurrentSaleViewEnum } from "./enums/SalesEnums";
import dayjs from "dayjs";





export function NewSalePage() {
const { 
    saleId,
    statusOfSale,
    canal,
    metodo,
    dataPedido,
    itens,
    clientSelected,
    observacaoRef,
    valFrete,
    totalItens,
    desconto,
    precoTotalItens,
    precoTotal,
    setStatusOfSale,
    setCanalDeVenda,
    setMetodoEntrega,
    setDatePedido,
    setItens,
    setClient,
    onDeleteItem,
    restForm,
    onChangedCurrentPage } = useSales();
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const jaCarregouRef = useRef(false);
const [products, setProducts] = useState<ProductSalesEntity[]>([]);
const [productSelected, setSelectProduct] = useState<ProductSalesEntity | null>(null);
const [quantidade, setQuantidade] = useState<number | "">("");
const [infoForm, setForm] = useState<FormSalesEntity | null>(null);
const searchClientRef = useRef("");
const searchProductRef = useRef("");
const [clients, setClients] = useState<ClientSalesEntity[]>([]);
const [loading, setLoading] = useState(false);
const debounceRef = useRef<number | null>(null);
const debounceProductRef = useRef<number | null>(null);



const canais = useMemo(() => infoForm?.canais ?? [], [infoForm]);
const metodos = useMemo(() => infoForm?.entrega ?? [], [infoForm]);



const getFormSales = async () => {
  setLoading(true);
  try {
    const result = await fetchFormSale();
     if (!result?.success) {
    setToastType("error");
    setToastMsg(result?.message ?? "Erro em buscar dados do formulário.");
    setToastOpen(true);
    return;
    }
    setForm(result.data);
  } catch (error) {
    setToastType("error");
    setToastMsg("Erro em buscar dados do formulário.");
    setToastOpen(true);
    return;
  }finally {
    setLoading(false);
  }
}

const handleSearchChange = (value: string) => {
  searchClientRef.current = value;

  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  if (!value || value.trim().length < 2) {
    setClients([]);
    return;
  }

  debounceRef.current = window.setTimeout(() => {
    fetchClients(searchClientRef.current);
  }, 500);
};

const handleSearchChangeProduct = (value: string) => {
  searchProductRef.current = value;

  if (debounceProductRef.current) {
    clearTimeout(debounceProductRef.current);
  }

  if (!value || value.trim().length < 2) {
    setProducts([]);
    return;
  }

  debounceProductRef.current = window.setTimeout(() => {
    fetchProducts(searchProductRef.current);
  }, 500);
};

const onSubmitNewSale = async () => {
  try {
    setLoading(true);
 const observacao = observacaoRef.current?.value?.trim() || null;
    const dto: NewSaleDTO = {
      canal_id: canal?.id ?? 0,
      client_id: clientSelected?.id ?? 0,
      data_pedido: dataPedido ? dataPedido.toISOString() : "",
      desconto: desconto ?? 0,
      entrega_id: metodo?.id ?? 0,
      observacao: observacao,
      status: statusOfSale ?? "",
      total: precoTotal,
      sub_total:precoTotalItens,
      val_frete: valFrete,
      itens: itens.map((item) => ({
        produto_id: item.produto_id!,
        qtd: item.quantidade!,
        val_unitario: item.valor_unitario!,
        sub_total: item.sub_total!
      }))
    };

    const result =saleId?await updateSubmitSale(dto, saleId): await submitNewSale(dto);

    if (!result?.success) {
      setToastType("error");
      setToastMsg(result?.message ?? "Erro. Não foi possível cadastrar uma nova venda.");
      setToastOpen(true);
      return;
    }

    // sucesso
    setToastType("success");
    setToastMsg("Venda cadastrada com sucesso.");
    setToastOpen(true);
    restForm();
    onChangedCurrentPage(CurrentSaleViewEnum.Order);
  } catch (error) {
    setToastType("error");
    setToastMsg("Erro. Não foi possível cadastrar uma nova venda.");
    setToastOpen(true);
    console.error(error);
  } finally {
    setLoading(false);
  }
};



const fetchClients = async (search: string) => {
  setLoading(true);
  try {
    const result = await fetchClient(search);
    if (!result?.success) {
      setToastType("error");
      setToastMsg(result?.message ?? "Erro ao buscar cliente.");
      setToastOpen(true);
      return;
    }
    setClients(result.data);
  } catch {
    setToastType("error");
    setToastMsg("Erro ao buscar cliente.");
    setToastOpen(true);
  } finally {
    setLoading(false);
  }
};

const fetchProducts = async (value: string) => {
  if (!value || value.trim().length < 2) {
    setProducts([]);
    return;
  }

  setLoading(true);

  const result = await fetchProductByGtinOrNameSales(value);

  if (!result?.success) {
    setProducts([]);
    setLoading(false);
    return;
  }

  const data: ProductSalesEntity[] = result.data;

  // se veio apenas 1 produto (GTIN)
  if (data.length === 1) {
    setSelectProduct(data[0]);
    setProducts(data); // opcional
  } else {
    setProducts(data);
  }

  setLoading(false);
};


useEffect(() => {
   if (jaCarregouRef.current) return;
    jaCarregouRef.current = true;
  getFormSales();
}, []);



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
    <Box flexDirection={"column"} mb={2}>
   
    <Box display={"flex"} flexDirection={"column"} flexGrow={2} ml={2}>
    <Box display={"flex"} flexDirection={"column"}>
    <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
    Novo Pedido
    </Typography>
    <Typography sx={{fontWeight:400, fontSize:"1rem", color:colorOpacity}}>
    Crie um novo pedido de venda
    </Typography>
    </Box>
    <Box display={"flex"} flexDirection={"row"} flexGrow={1} mt={4} gap={4} mr={2}>
      <Box display={"flex"} flex={3.2} flexDirection={"column"} gap={4}>
        <Box display={"flex"} flexDirection={"column"} p={4} width="100%" sx={{
           border: bordasComponents, borderRadius:1}}>
            <Stack display={"flex"} flexDirection={"row"} width="100%" justifyContent={"flex-start"} alignItems={"center"} gap={2}>
                <ShoppingCart color="#FFFF" size={34}/>
                <Typography color={"#FFFF"} fontSize="1.2rem" fontWeight="bold">
                    Dados do Pedido
                </Typography>
            </Stack>
            <Box display={"grid"}  gridTemplateColumns="repeat(2, 1fr)" gap={4} flexGrow={1} width={"100%"} mt={4}>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography color={"#FFFF"} fontWeight={400}>Cliente *</Typography>
             <Autocomplete<ClientSalesEntity, false, false, false>
              options={clients}
              loading={loading}
              value={clientSelected}
              onInputChange={(_, value, reason) => {
                if (reason === "input") {
                  handleSearchChange(value);
                }
              }}
              onChange={(_, value) => {
                setClient(value);
              }}
              getOptionLabel={(option) => option.nome}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Buscar por cliente..."
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
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Typography color={"#FFFF"} fontWeight={400}>Data do Pedido *</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                format="DD/MM/YYYY"
                label="dd/mm/aaaa"
                maxDate={dayjs(new Date)}
                value={dataPedido}
                onChange={(date) => setDatePedido(date)}
                slotProps={{
                    textField: {
                    variant: "outlined",
                    sx: {
                        backgroundColor: "#182543",
                        borderRadius: 1,
                        border: "1px solid rgba(40, 61, 107, 0.4)",

                        "& .MuiOutlinedInput-root": {
                        backgroundColor: "#182543",
                        },

                        "& .MuiOutlinedInput-input": {
                        color: "#fff",
                        WebkitTextFillColor: "#fff",
                        fontSize: 16,
                        fontWeight: 500,
                        },

                        "& .MuiOutlinedInput-input::placeholder": {
                        color: "#fff",
                        opacity: 1,
                        },
                        "& .MuiInputLabel-root": {
                        color: "#fff",
                        },
                      "& .MuiIconButton-root:hover": {
                        color: primaryColor,
                      },
                      "& .MuiIconButton-root": {
                        color: colorOpacity,
                      },
                    },
                    },
                    popper: {
                    sx: {
                        "& .MuiPaper-root": {
                        backgroundColor: bgColorCardsDashBoard,
                        color: "#fff",
                        border: bordasComponents,
                        },
                        "& .MuiPickersDay-root": {
                        color: "#fff",
                        },
                        "& .MuiPickersDay-root.Mui-selected": {
                        backgroundColor: primaryColor,
                        color: "#fff",
                        fontWeight: 900,
                        },
                    },
                    },
                }}
                />
               </LocalizationProvider>
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography color={"#FFFF"} fontWeight={400}>Canal de Venda *</Typography>
            <Autocomplete<Canais, false, false, false>
              options={canais}
              value={canal}
              loading={loading}
              loadingText="Carregando canais..."
              noOptionsText="Nenhum canal disponível"
              onChange={(_, value) => setCanalDeVenda(value)}
              getOptionLabel={(option) => option.nome}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Selecione o canal de venda..."
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
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography color="#FFF" fontWeight={400}>
                Método de Entrega *
              </Typography>
              <Autocomplete<Entrega, false, false, false>
                options={metodos}
                value={metodo}
                loading={loading}
                loadingText="Carregando métodos de entrega..."
                noOptionsText="Nenhum método disponível"
                onChange={(_, value) => setMetodoEntrega(value)}
                getOptionLabel={(option) => option.nome}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Selecione um método de entrega..."
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
                )}
              />
            </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={1} mt={4}>
            <Typography color={"#FFFF"} fontWeight={400}>Observação *</Typography>
            <TextField
            inputRef={observacaoRef}
            multiline
            rows={4}
            placeholder="Observações do pedido..."
            sx={textFieldStyle}
            />
            </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} p={4} width="100%" 
        sx={{border: bordasComponents, borderRadius:1}}>
            <Stack display={"flex"} flexDirection={"row"} width="100%" justifyContent={"flex-start"} alignItems={"center"} gap={2}>
                <Package color="#FFFF" size={34}/>
                <Typography color={"#FFFF"} fontSize="1.2rem" fontWeight="bold">
                    Produtos do Pedido
                </Typography>
            </Stack>
<Box
  display="grid"
  gridTemplateColumns="2fr 1fr 1fr auto"
  gap={2}
  mt={2}
>
  {/* PRODUTO */}
<Autocomplete<ProductSalesEntity, false, false, false>
  options={products}
  loading={loading}
  value={productSelected}
              onInputChange={(_, value, reason) => {
                if (reason === "input") {
                  handleSearchChangeProduct(value);
                }
              }}
              onChange={(_, value) => {
                setSelectProduct(value);
                 setQuantidade("");
              }}
  getOptionLabel={(option) => option.nome}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Buscar por produto..."
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
  )}
/>


  {/* QUANTIDADE */}
  <TextField
    placeholder="Qtd"
    type="number"
    value={quantidade}
    onChange={(e) => {
      const value = e.target.value;
      if (!productSelected) return;

      // se não permite fracionado, força inteiro
      if (!productSelected.fracionado && value.includes(".")) return;

      setQuantidade(value === "" ? "" : Number(value));
    }}
    inputProps={{
      step: productSelected?.fracionado ? "0.01" : "1",
      min: 0,
    }}
    sx={textFieldStyle}
    disabled={!productSelected}
  />

  {/* VALOR UNITÁRIO (READ ONLY) */}
  <TextField
    value={
      productSelected
        ? maskCurrency(productSelected.preco_venda)
        : ""
    }
    placeholder="Valor unit."
    sx={textFieldStyle}
    disabled
  />

  {/* BOTÃO ADICIONAR */}
  <PrimaryActionButton
    label="Adicionar"
    height={53}
    boxShadow="0 0 20px rgba(245,159,10,0.35)"
    background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
    sx={{mt:0.4}}
    disabled={!productSelected || !quantidade || quantidade <= 0}
    onClick={() => {
      if (!productSelected || !quantidade) return;
       const jaExiste = itens.some(
        (item) => item.produto_id === productSelected.id
    );

  if (jaExiste) {
    setToastType("error");
    setToastMsg("Produto já adicionado a lista");
    setToastOpen(true);  
    return;
}

      const subTotal =
        quantidade * productSelected.preco_venda;

      setItens((prev) => [
        ...prev,
        {
          produto_id: productSelected.id,
          nome: productSelected.nome,
          quantidade,
          valor_unitario: productSelected.preco_venda,
          sub_total: subTotal,
        },
      ]);

      // reset
      setSelectProduct(null);
      setQuantidade("");
    }}
  />
</Box>
{itens.length > 0 ? (
  <TableContainer sx={{ maxHeight: "100%", mt: 0 }}>
    <Table
      stickyHeader
      aria-label="Pedidos Recentes"
      sx={{
        mt: 2,
        bgcolor: "transparent",
        borderCollapse: "separate",
        borderSpacing: "0 8px",
      }}
    >
      {/* HEADER */}
      <TableHead>
        <TableRow>
          {["Produto", "Qtd", "Valor Unit.", "Subtotal", ""].map((col) => (
            <TableCell
              key={col}
              sx={{
                backgroundColor: "transparent",
                color: colorOpacity,
                fontSize: "0.9rem",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(40, 61, 107, 0.4)",
              }}
            >
              {col}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      {/* BODY */}
      <TableBody>
        {itens.map((row, index) => (
          <TableRow
            key={`${row.produto_id}-${index}`}
            sx={{
              backgroundColor: "rgba(255,255,255,0.02)",
              transition: "0.25s ease",
              "&:hover": {
                ...hoverGlow,
              },
            }}
          >
            <TableCell sx={cellStyleBold}>{row.nome}</TableCell>
            <TableCell sx={cellStyle}>{row.quantidade}</TableCell>
            <TableCell sx={cellStyleBold}>
              {maskCurrency(row.valor_unitario!)}
            </TableCell>
            <TableCell sx={cellStyleBold}>
              {maskCurrency(row.sub_total!)}
            </TableCell>
            <TableCell sx={cellStyle}>
              <Stack direction="row" spacing={1}>
                <Box
                  onClick={() => onDeleteItem(index)}
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    cursor: "pointer",
                    color: colorNegative,
                    transition: "0.25s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,50,50,0.15)",
                      boxShadow: "0 0 12px rgba(255,50,50,0.45)",
                    },
                  }}
                >
                  <Trash2 />
                </Box>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
) : (
  <Box
    sx={{
      mt: 3,
      height: 180,
      border: "2px dashed rgba(40, 61, 107, 0.6)",
      borderRadius: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: colorOpacity,
    }}
  >
    <Typography fontSize="1rem">
      Nenhum produto adicionado ao pedido
    </Typography>
  </Box>
)}

        </Box>
      </Box>
      <Box display={"flex"} flex={2} flexDirection={"column"}>
        <Box display={"flex"} flexDirection={"column"} p={4} width="100%" sx={{border: bordasComponents, borderRadius:1}}>
            <Typography color={"#FFFF"} fontSize="1.2rem" fontWeight="bold">
                Resumo do Pedido
            </Typography>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} mt={2}>
            <Typography color ={colorOpacity} fontSize="1rem" fontWeight={400}>
                Itens ({totalItens})
            </Typography>
            <Typography color={"#FFFF"} fontSize="1rem" fontWeight={400}>
                {maskCurrency(precoTotalItens)}
            </Typography>
            </Stack>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} mt={1}>
            <Typography color ={colorOpacity} fontSize="1rem" fontWeight={400}>
                Frete
            </Typography>
            <Typography color={"#FFFF"} fontSize="1rem" fontWeight={400}>
                {maskCurrency(valFrete)}
            </Typography>
            </Stack>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} mt={1}>
            <Typography color ={colorOpacity} fontSize="1rem" fontWeight={400}>
                Desconto Geral
            </Typography>
            <Typography color={"#FFFF"} fontSize="1rem" fontWeight={400}>
                {desconto}%
            </Typography>
            </Stack>
            <Divider
            sx={{
                my: 2,
                borderWidth: 1.5,
                borderColor: "rgba(40, 61, 107, 0.8)",
            }}
            />
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} mt={2}>
            <Typography color={"#FFFF"} fontSize="1.4rem" fontWeight="bold">
                Total
            </Typography>
            <Typography color={primaryColor} fontSize="1.4rem" fontWeight="bold">
                {maskCurrency(precoTotal)}
            </Typography>
            </Stack>
            <Box display={"flex"} flexDirection={"column"} gap={1} mb={4}>
            <Typography color={"#FFFF"} fontWeight={400} mt={2}>Status</Typography>
            <Autocomplete
            options={typeOfStatusListNewSales}
            value={statusOfSale}
            onChange={(_, value) => {
                setStatusOfSale(value!);
            }}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
                <TextField
                {...params}
                placeholder="Status do pedido..."
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
            )}
            />
            </Box>
    <PrimaryActionButton
      label="Salvar"
      height={53}
      boxShadow="0 0 20px rgba(245,159,10,0.35)"
      startIcon={<Save />}
      background="linear-gradient(to right, #f59f0a 0%, #e68a00 100%)"
      sx={{ mt: 0.4 }}
      loading={loading}
      onClick={onSubmitNewSale}
    />
    <PrimaryActionButton
    label="Cancelar"
     height={53}
    background={"transparent"}
    sx={{mt:2}}
    boxShadow={"transparent"}
    onClick={() => {
    onChangedCurrentPage(CurrentSaleViewEnum.Order);
    }}
  />
      </Box>
      </Box>
    </Box>
    </Box>
    </Box>
    </>
    );
    }