export interface SalesEntity {
id: number,
cliente: string,
canal: string,
data_cadastro: string,
data_pedido: string,
itens: number,
total: number,
status: string,
ultimo_pedido: number
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

export interface SaleDetailsModalEntity {
    id: number,
    cliente_id: number,
    ultimo_pedido: number,
    cliente: string,
    data_pedido: string,
    canal: string| null,
    canal_id: number | null,
    entrega_id: number |null,
    custo_base: number | null,
    entrega: string| null,
    status: string| null,
    grupo_cliente: string| null,
    val_frete: number,
    total: number,
    sub_total: number,
    observacao: string | null,
    desconto: number,
    itens: ItensSaleModal []
}

export interface ItensSaleModal {
    id: number,
    qtd: number,
    val_un: number,
    produto: string,
    sub_total: number
}