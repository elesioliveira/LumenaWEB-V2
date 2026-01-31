

export interface CompanyFORMDTO {
  razao: string | null;
  fantasia: string | null;
  cnpj: string | null;
  ie: string | null;
  im: string | null;
  email: string | null;
  telefone: string | null;
  celular: string | null;
  website: string | null;
  cep: string | null;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
  observacao: string | null;
}

export interface UserDTOForm {
  nome: string | null,
  email: string| null,
  senha: string| null,
  confirmarSenha: string| null,
  ativo: boolean| null,
  perfil: number| null,
}
export interface UserDTOAPI {
  nome: string,
  email: string,
  senha: string | null,
  ativo: boolean,
  perfil: string
}

export interface PerfilUser {
  value: number;
  label: string;
};

export interface DashBoardDTO {
  qtd_usuario: number;
  qtd_ativo: number;
  qtd_inativo: number;
  qtd_administrador: number;
}