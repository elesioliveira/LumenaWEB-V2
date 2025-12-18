export interface FornecedorEntity {
      id: number | null,
      empresa_id:  number | null,
      nome:  string | null,
      cnpj: string| null,
      telefone:  string | null,
      email: string | null,
      cidade: string | null,
      bairro: string | null,
      endereco: string | null,
      ativo: boolean
};