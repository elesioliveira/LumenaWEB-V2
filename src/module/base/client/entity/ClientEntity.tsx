
export interface ClientEntity  {
id: number,
nome: string,
tipo: number | null,
telefone: string,
email: string,
documento: string,
grupo: string,
local: string,
ativo: boolean
}

export interface GroupClientEntity {
    id: number | null,
    nome: string,
    descricao: string,
    desconto: number,
    clients: number,
    ativo: boolean
}

export interface ClientDetailsEntity {
  id: number| null;
  data_cadastro: string| null;    // ISO string (ex: 2025-12-28T19:13:13.421279)
  ativo: boolean| null;
  grupo_id: number | null;
  tipo: number| null;
  nome: string| null;
  documento: string| null;
  email: string| null;
  telefone: string| null;
  observacao: string | null;
  cidade: string| null;
  uf: string| null;
  bairro: string| null;
  rua: string| null;
  numero: string| null;
  complemento: string | null;
  cep: string| null;
  cod_uf: number| null;
}


export interface GrupoClient {
    id: number | null
    nome: string | null,
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

