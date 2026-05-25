export interface ProdutoFiscalEntity {
  id: number;
  produto_id: number;
  cfop_id: number;
  cfop_codigo?: string | null;
  cfop_descricao?: string | null;
  tipo_operacao?: string | null;

  icms_cst?: string | null;
  icms_aliquota?: number | null;
  icms_reducao_bc?: number | null;

  pis_cst?: string | null;
  pis_aliquota?: number | null;

  cofins_cst?: string | null;
  cofins_aliquota?: number | null;

  ipi_cst?: string | null;
  ipi_aliquota?: number | null;

  data_cadastro: string;
}
