export interface ProdutoFiscalDTO {
  produto_id: number;
  cfop_id: number;

  icms_cst?: string | null;
  icms_aliquota?: number | null;
  icms_reducao_bc?: number | null;

  pis_cst?: string | null;
  pis_aliquota?: number | null;

  cofins_cst?: string | null;
  cofins_aliquota?: number | null;

  ipi_cst?: string | null;
  ipi_aliquota?: number | null;
}
