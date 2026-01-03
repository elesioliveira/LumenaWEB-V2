

export interface EstoqueItem {
    produto_id : number | null,
    nome: string | null,
    quantidade: number | null,
    valor_unitario: number |null,
    sub_total: number | null
}

export interface EstoqueItemDTO {
  produto_id: number;
  quantidade: number;
  valor_unitario: number;
  sub_total: number;
}


export interface MovimentarEstoqueDTO {
    tipo: string | null,
    nota: string | null,
    fornecedor_id: number | null,
    data_emissao: any,
    observacao: string | null,
    valor_total: number | null,
    motivo_saida: string | null,
    itens: EstoqueItemDTO [] | null,
}

export interface ProdutoExample {
  id: number;
  nome: string;
  valor_unitario: number;
  permite_fracionado: boolean;
}