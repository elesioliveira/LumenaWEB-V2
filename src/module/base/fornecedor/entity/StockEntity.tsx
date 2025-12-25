
export interface ModalViewMovimentationEntity {
    nota : string,
    fornecedor: string,
    data_emissao: string,
    observacao: string | null,
    entrada: boolean ,
    produtos: ProductIntoMoalMovimentation[]
}

export interface ProductIntoMoalMovimentation {
    nome: string,
    qtd: number,
    valor: number,
    subTotal: number,
    valorTotal: number,
}


export interface StockProduct {
    id: number,
    nome: string | null,
    valor_custo: number,
    fracionado: boolean
}

export interface StockEntradaEntity {
movimentacao_id: number,
nota: string,
tipo: string,
fornecedor: string,
data_emissao: string,
data_ocorrencia: string,
total_itens: number,
valor_total: number
}

export interface MovimetDetails {
    movimentacao_id: number,
    nota: string,
    tipo: string,
    data_emissao: string,
    observacao: string | null,
    fornecedor: string,
    valor_total: number,
    itens: ProductMovimetDetails[]
}


export interface ProductMovimetDetails {
    produto: string,
    quantidade: number,
    valor_unitario: number,
    sub_total: number
}