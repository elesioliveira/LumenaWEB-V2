
export interface CompanyEntityRegister {
  razao_social: string,
  nome_responsavel: string,
  cnpj: string,
  email: string,
  senha: string
}

export interface User {
  id: number;
  empresaid: number;
  datacadastro: string;
  nome: string;
  email: string;
  ativo: boolean;
  rotas: number[];
}
