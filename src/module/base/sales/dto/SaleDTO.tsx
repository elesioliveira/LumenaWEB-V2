

export interface NewSaleDTO {
  client_id: number;
  data_pedido: string;
  canal_id: number;
  entrega_id: number;
  observacao: string | null;
  val_frete: number;
  desconto: number;
  total: number;
  sub_total: number;
  status: string;
  itens: SaleItensDTO[];
}

export interface SaleItensDTO {
  produto_id: number;
  qtd: number;
  val_unitario: number;
  sub_total: number;
}

export interface SaleItensFormDTO {
  produto_id: number;
  quantidade: number;
  nome: string | null,
  valor_unitario: number;
  sub_total: number;
}