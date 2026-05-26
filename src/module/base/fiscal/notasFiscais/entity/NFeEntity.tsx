export interface NotaFiscalEntity {
  id: number;
  modelo: number;
  serie: number;
  numero: number;
  chave_acesso?: string | null;
  natureza_operacao?: string | null;
  data_emissao?: string | null;
  data_autorizacao?: string | null;
  dest_cpf_cnpj?: string | null;
  dest_nome?: string | null;
  dest_uf?: string | null;
  valor_produtos?: number | null;
  valor_total?: number | null;
  status: string;
  protocolo_autorizacao?: string | null;
  motivo_rejeicao?: string | null;
  ambiente: number;
  venda_id?: number | null;
  data_cadastro: string;
}

export interface CertificadoDigitalEntity {
  id?: number;
  razao_social?: string | null;
  cnpj?: string | null;
  validade_inicio?: string | null;
  validade_fim?: string | null;
  data_upload?: string | null;
  valido: boolean;
}
