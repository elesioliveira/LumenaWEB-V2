export interface MovimentacaoWalletDTO {
    id: number;
    data_cadastro: string;
    descricao: string;
    categoria: string;
    origem: string;
    status: string;
    valor: number;
}

export interface SummaryCardDTO {
    title : string;
    valor: number;
    descricao: string;
    positive?: boolean;
}

export interface ContaPagarDTO {
    id: number;
    descricao: string;
    fornecedor?: string;
    categoria?: string;
    vencimento?: string;
    status?: string;
    valor?: number;
}
export interface ContaReceberDTO {
    id: number;
    descricao: string;
    cliente?: string;
    categoria?: string;
    vencimento?: string;
    status?: string;
    valor?: number;
}

export interface CategoryDTO {
    id: number;
    data_cadastro: string;
    nome: string;
    tipo: string;
    descricao: string | null;
    cor: string;
    ativo: boolean; //true ou false
}

export interface CategoryModalDTO {
 nome: string | null;
 tipo: number | null;
 cor: number |null;
 descricao:string | null;
}
export interface CategoryModalDTOAPI {
 nome: string | null;
 tipo: string | null;
 cor: string |null;
 descricao:string | null;
 ativo: boolean | null;
}

export interface totalCategoriasAtivas {
    totalReceita: number;
    totalDespesa: number;
}

export interface ContaReceberFormDTO {
    descricao: string | null;
    cliente_id: number | null;
    categoria_id: number | null;
    vencimento: string | null;
    valor: string   | null;
    tipo_pagamento: string  | null;
    observacao: string | null;
}
export interface NovaContaDTO {
    descricao: string |null;
    categoria_id: number | null;
    cliente_id: number | null;
    fornecedor_id: number | null;
    valor_total: number | null;
    data_vencimento: string | null;
    status: string | null;
    origem_tipo: string | null;
    observacao: string | null;
    tipo_pagamento: string | null;   
};