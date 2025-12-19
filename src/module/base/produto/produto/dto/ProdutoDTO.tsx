export interface ProductDTO {
  nome?: string | null;
  descricao?: string | null;
  ativo: boolean | null;
  un?: string | null;
  eanCode?: string | null;
  marca_id: number| string;
  fornecedor_id: number| string
  categoria_id: number| string
  preco_custo?: number | null;
  preco_venda?: number | null;
  estoque_minimo?: number | null;
}
