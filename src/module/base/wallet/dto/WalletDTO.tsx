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