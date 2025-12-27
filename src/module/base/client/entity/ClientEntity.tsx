
export interface ClientEntity  {
id: number,
nome: string,
tipo: string,
telefone: string,
email: string,
documento: string,
grupo: string,
cidade: string,
ativo: boolean
}

export interface GroupClientEntity {
    id: number,
    nome: string,
    descricao: string,
    desconto: number,
    clients: number,
    ativo: boolean
}

export interface ClientDetailsEntity  {
id: number,
nome: string,
tipo: string,
telefone: string,
email: string,
documento: string,
grupo: string,
cidade: string,
ativo: boolean,
rua: string |null,
numero: string |null,
complemento: string |null,
bairro: string |null,
cep: string |null,
uf: string |null,
observacao: string |null,
}

export interface GrupoClient {
    id: number | null
    descricao: string | null,
    desconto: number | null,
    ativo: boolean | null,
}

export interface EnderecoByCepResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}


export interface TipoCliente {
    id:number | null,
    descricao: string| null
}
export interface UfEntity {
    id:number | null,
    descricao: string| null
}