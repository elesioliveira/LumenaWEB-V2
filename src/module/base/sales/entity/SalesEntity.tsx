export interface SalesEntity {
nPedido: number,
client: string,
canal: string,
date: string,
itens: number,
total: number,
status: string
};


export interface Canais {
    id: number,
    nome: string
}
export interface Entrega {
    id: number,
    nome: string,
    custo: number
}

export interface FormSalesEntity {
    id: number,
    razaoSocial: string,
    canais: Canais[],
    entrega: Entrega[]
}

export interface ClientSalesEntity {
    id: number,
    nome: string,
    desconto: number
}

export interface ProductSalesEntity {
    id: number,
    nome: string,
    preco_venda: number,
    fracionado: boolean
}