import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { bgColorCardsDashBoard, bgComponents, colorOpacity, hoverGlow, primaryColor, textFieldStyle } from "../../../../theme/theme";
import { cellStyle, cellStyleBold } from "../../../../theme/cellTable";
import { PaginationButton } from "../../produto/fornecedor/components/PaginationButton";
import type { ProdutoFiscalEntity } from "./entity/ProdutoFiscalEntity";
import type { CfopEntity } from "../cfop/entity/CfopEntity";
import { deleteProdutoFiscal, getProdutoFiscal } from "./repository/ProdutoFiscalRepository";
import { getCfops } from "../cfop/repository/CfopRepository";
import { getProduct } from "../../produto/produto/repository/ProductRepository";
import type { ProductEntity } from "../../produto/produto/entity/ProductEntity";
import { CreateOrUpdateProdutoFiscalModal } from "./components/CreateOrUpdateProdutoFiscalModal";

const tipoOperacaoLabels: Record<string, string> = {
  venda: "Venda",
  devolucao: "Devolução",
  estorno: "Estorno",
  avaria: "Avaria",
  transferencia: "Transferência",
  remessa: "Remessa",
  outros: "Outros",
};

export function ProdutoFiscalPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRegra, setSelectedRegra] = useState<ProdutoFiscalEntity | null>(null);
  const [regras, setRegras] = useState<ProdutoFiscalEntity[]>([]);
  const [cfops, setCfops] = useState<CfopEntity[]>([]);
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductEntity | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [loading, setLoading] = useState(false);
  const jaCarregouRef = useRef(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(regras.length / rowsPerPage);
  const regrasPaginadas = regras.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchRegras = async (produtoId: number) => {
    setLoading(true);
    try {
      const response = await getProdutoFiscal(produtoId);
      if (response?.success) {
        setRegras(response.data);
        setPage(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialData = async () => {
    try {
      const [cfopResp, prodResp] = await Promise.all([
        getCfops(),
        getProduct(""),
      ]);
      if (cfopResp?.success) setCfops(cfopResp.data);
      if (prodResp?.success) setProducts(prodResp.data);
    } catch {
      // silent
    }
  };

  const handleDeleteRegra = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteProdutoFiscal(id);
      if (!response?.success) {
        setToastType("error");
        setToastMsg(response?.message ?? "Erro ao remover regra fiscal.");
        setToastOpen(true);
        return;
      }
      if (selectedProduct) await fetchRegras(selectedProduct.id);
    } catch {
      setToastType("error");
      setToastMsg("Erro ao remover regra fiscal.");
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jaCarregouRef.current) return;
    jaCarregouRef.current = true;
    fetchInitialData();
  }, []);

  const handleProductSelect = (product: ProductEntity | null) => {
    setSelectedProduct(product);
    setRegras([]);
    if (product) {
      fetchRegras(product.id);
    }
  };

  const handleEdit = (row: ProdutoFiscalEntity) => {
    setSelectedRegra(row);
    setOpenModal(true);
  };

  return (
    <Box flexDirection="column">
      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={toastType} onClose={() => setToastOpen(false)} sx={{ width: "100%" }}>
          {toastMsg}
        </Alert>
      </Snackbar>

      {selectedProduct && (
        <CreateOrUpdateProdutoFiscalModal
          open={openModal}
          onClose={() => {
            setSelectedRegra(null);
            setOpenModal(false);
          }}
          onSuccess={async () => {
            if (selectedProduct) await fetchRegras(selectedProduct.id);
          }}
          regra={selectedRegra}
          produtoId={selectedProduct.id}
          cfops={cfops}
        />
      )}

      <Box display="flex" flexDirection="column" flexGrow={2} sx={{ pl: { xs: 1, md: 2 } }}>
        <Stack display="flex" direction={{ xs: "column", md: "row" }} flexGrow={2} justifyContent="space-between" flexWrap="wrap" gap={{ xs: 1, md: 2 }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#fff" }}>
            Regras Fiscais por Produto
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} gap={2} mt={2} alignItems={{ md: "center" }}>
          <Box flex={1} maxWidth={{ md: 400 }}>
            <Autocomplete
              options={products}
              getOptionLabel={(option) => `${option.nome ?? ""} ${option.eanCode ? `(${option.eanCode})` : ""}`}
              value={selectedProduct}
              onChange={(_, newValue) => handleProductSelect(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Buscar produto..."
                  sx={textFieldStyle}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <Search size={16} color="#94a3b8" style={{ marginRight: 8 }} />
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
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
          </Box>
          {selectedProduct && (
            <Button
              startIcon={<Plus />}
              onClick={() => setOpenModal(true)}
              sx={{
                height: 40,
                px: 3,
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 1,
                background: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
                boxShadow: "0 0 20px rgba(245,159,10,0.35)",
                transition: "0.25s ease",
                "&:hover": {
                  background: "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
                  boxShadow: "0 0 25px rgba(245,159,10,0.55)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Nova Regra
            </Button>
          )}
        </Stack>

        <Box mr={2} flexGrow={1} mt={2}>
          {!selectedProduct && (
            <Stack height={200} alignItems="center" justifyContent="center">
              <Typography color={colorOpacity}>
                Selecione um produto para visualizar as regras fiscais.
              </Typography>
            </Stack>
          )}

          {selectedProduct && loading && (
            <Stack height={200} alignItems="center" justifyContent="center">
              <CircularProgress color="inherit" />
              <Typography mt={2} color={colorOpacity}>
                Carregando regras fiscais...
              </Typography>
            </Stack>
          )}

          {selectedProduct && !loading && regras.length === 0 && (
            <Stack height={200} alignItems="center" justifyContent="center">
              <Typography color={colorOpacity}>
                Nenhuma regra fiscal cadastrada para este produto.
              </Typography>
            </Stack>
          )}

          {selectedProduct && !loading && regras.length > 0 && (
            <TableContainer sx={{ maxHeight: "100%", mr: 5, mt: 2, overflowX: "auto" }}>
              <Table
                stickyHeader
                sx={{
                  bgcolor: "transparent",
                  borderCollapse: "separate",
                  borderSpacing: "0 8px",
                  minWidth: 900,
                }}
              >
                <TableHead>
                  <TableRow>
                    {["CFOP", "Operação", "ICMS CST", "ICMS %", "PIS CST", "PIS %", "COFINS CST", "COFINS %", "IPI CST", "IPI %", "Ações"].map((col) => (
                      <TableCell
                        key={col}
                        sx={{
                          backgroundColor: "transparent",
                          color: colorOpacity,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          borderBottom: "1px solid rgba(40, 61, 107, 0.4)",
                        }}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {regrasPaginadas.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.02)",
                        transition: "all 0.25s ease",
                        ...hoverGlow,
                      }}
                    >
                      <TableCell sx={cellStyleBold}>{row.cfop_codigo}</TableCell>
                      <TableCell sx={cellStyle}>
                        {tipoOperacaoLabels[row.tipo_operacao ?? ""] ?? row.tipo_operacao}
                      </TableCell>
                      <TableCell sx={cellStyle}>{row.icms_cst ?? "-"}</TableCell>
                      <TableCell sx={cellStyle}>{row.icms_aliquota != null ? `${row.icms_aliquota}%` : "-"}</TableCell>
                      <TableCell sx={cellStyle}>{row.pis_cst ?? "-"}</TableCell>
                      <TableCell sx={cellStyle}>{row.pis_aliquota != null ? `${row.pis_aliquota}%` : "-"}</TableCell>
                      <TableCell sx={cellStyle}>{row.cofins_cst ?? "-"}</TableCell>
                      <TableCell sx={cellStyle}>{row.cofins_aliquota != null ? `${row.cofins_aliquota}%` : "-"}</TableCell>
                      <TableCell sx={cellStyle}>{row.ipi_cst ?? "-"}</TableCell>
                      <TableCell sx={cellStyle}>{row.ipi_aliquota != null ? `${row.ipi_aliquota}%` : "-"}</TableCell>
                      <TableCell sx={cellStyle}>
                        <Stack direction="row" spacing={1}>
                          <Box
                            onClick={() => handleEdit(row)}
                            sx={{
                              width: 32,
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 1,
                              cursor: "pointer",
                              color: colorOpacity,
                              transition: "0.25s ease",
                              "&:hover": {
                                color: primaryColor,
                                backgroundColor: "rgba(245,159,10,0.15)",
                                boxShadow: "0 0 12px rgba(245,159,10,0.45)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Pencil size={16} />
                          </Box>
                          <Box
                            onClick={() => handleDeleteRegra(row.id)}
                            sx={{
                              width: 32,
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 1,
                              cursor: "pointer",
                              color: colorOpacity,
                              transition: "0.25s ease",
                              "&:hover": {
                                color: "#ff5252",
                                backgroundColor: "rgba(255,50,50,0.15)",
                                boxShadow: "0 0 12px rgba(255,50,50,0.45)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Trash2 size={16} />
                          </Box>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {selectedProduct && !loading && regras.length > rowsPerPage && (
            <Box mt={3} display="flex" justifyContent="center" alignItems="center" gap={2} mb={2} flexWrap="wrap">
              <PaginationButton disabled={page === 0} onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
                <ChevronLeft size={20} />
              </PaginationButton>
              <Box
                sx={{
                  minWidth: 48,
                  height: 36,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#fff",
                  background: bgComponents,
                }}
              >
                {page + 1}
              </Box>
              <PaginationButton disabled={page >= totalPages - 1} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}>
                <ChevronRight size={20} />
              </PaginationButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
