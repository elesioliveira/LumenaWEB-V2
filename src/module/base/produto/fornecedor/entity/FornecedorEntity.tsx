export interface FornecedorEntity {
      id: number ,
      empresa_id:  number,
      razao_social:  string,
      cnpj: string,
      telefone:  string | null,
      email: string | null,
      cidade: string | null,
      bairro: string | null,
      endereco: string | null,
      ativo: boolean
};