export interface ProductEntity {
  id: number;
  empresa_id: number;
  data_cadastro: string; // ISO string (DateTime no backend)
  nome?: string | null;
  descricao?: string | null;
  ativo: boolean;
  un?: string | null;
  sku?: string | null;
  eanCode?: string | null;
  marca?: string | null;
  marca_id?: number | null;
  fornecedor?: string | null;
  fornecedor_id?: number | null;
  categoria_id?: number | null;
  categoria?: string | null;
  preco_custo?: number | null;
  preco_venda?: number | null;
  estoque_minimo?: number | null;
}

export interface CategoryProduct {
  id: number;
  nome: string;
}
export interface FornecedorProduct {
  id: number;
  nome: string;
}
export interface MarkProduct {
  id: number;
  nome: string;
}

export interface FormProductData {
  categorias: CategoryProduct[];
  fornecedores: FornecedorProduct[];
  marcas: MarkProduct[];
}