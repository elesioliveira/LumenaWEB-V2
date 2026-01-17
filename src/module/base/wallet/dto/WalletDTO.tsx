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