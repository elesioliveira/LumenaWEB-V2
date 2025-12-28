export interface ClientDTO  {
nome: string |null,
tipo: number |null,
telefone: string |null,
email: string |null,
documento: string |null,
grupo_id: number |null,
cidade: string |null,
ativo: boolean | null,
rua: string |null,
numero: string |null,
complemento: string |null,
bairro: string |null,
cep: string |null,
uf: string | number |null,
cod_uf: number | null,
observacao: string |null,
}

export interface GroupDTO {
nome: string | null,
descricao: string | null,
desconto: number,
ativo: boolean 
}


export interface ClientStatusDTO {
    id: number,
    status: boolean
}