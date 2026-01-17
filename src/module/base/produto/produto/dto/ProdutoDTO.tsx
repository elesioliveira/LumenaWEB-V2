import type { IUnidade } from "../../../../../shared/Mocks";

export interface ProductDTO {
  nome?: string | null;
  descricao?: string | null;
  ativo: boolean ;
  un?: string | null | number;
  eanCode?: string | null;
  marca_id: number| string;
  fornecedor_id: number| string
  categoria_id: number| string
  preco_custo?: number | null;
  preco_venda?: number | null;
  estoque_minimo?: number | null;
}

export type TipoCategoria = "Receita" | "Despesa";

export interface CategoriaCor {
  id: number;
  tipo: TipoCategoria;
  cor: string;
  ativo?: boolean;
}