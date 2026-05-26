export interface EmitirNFeDTO {
  modelo: number;
  natureza_operacao?: string | null;
  dest_cpf_cnpj?: string | null;
  dest_nome?: string | null;
  venda_id?: number | null;
  itens: EmitirNFeItemDTO[];
  pagamentos: EmitirNFePagamentoDTO[];
}

export interface EmitirNFeItemDTO {
  produto_id: number;
  codigo?: string | null;
  descricao?: string | null;
  ncm?: string | null;
  cest?: string | null;
  cfop?: string | null;
  unidade?: string | null;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  origem: number;
  icms_cst?: string | null;
  icms_aliquota?: number | null;
  icms_reducao_bc?: number | null;
  pis_cst?: string | null;
  pis_aliquota?: number | null;
  cofins_cst?: string | null;
  cofins_aliquota?: number | null;
}

export interface EmitirNFePagamentoDTO {
  forma_pagamento: string;
  valor: number;
}

export interface CancelarNFeDTO {
  nota_fiscal_id: number;
  justificativa: string;
}

export interface InutilizarNFeDTO {
  modelo: number;
  serie: number;
  numero_inicial: number;
  numero_final: number;
  justificativa: string;
}

export interface UploadCertificadoDTO {
  pfx_base64: string;
  senha: string;
}

export interface ConfigFiscalEmpresaDTO {
  uf?: string | null;
  regime_tributario?: number | null;
  csc_id?: string | null;
  csc_token?: string | null;
  nfe_ambiente?: number | null;
}
