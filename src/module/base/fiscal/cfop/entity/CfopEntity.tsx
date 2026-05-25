export interface CfopEntity {
  id: number;
  codigo?: string | null;
  descricao?: string | null;
  natureza_operacao?: string | null;
  tipo_operacao?: string | null;
  ativo: boolean;
  data_cadastro: string;
}
