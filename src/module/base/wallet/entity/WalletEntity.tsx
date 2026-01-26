
export interface ContaReceberEntity  {
id: number;
data_cadastro: string;
vencimento: string;
descricao: string;
cliente: string;
cliente_id: number| null;
categoria: string;
categoria_id: number| null;
fornecedor_id: number| null;
fornecedor: string | null;
status: string;
valor: number;
tipo_pagamento: string;
origem_tipo: string;
observacao: string;
}

export interface ClientesWalletFormEntity {
  id: number;
  nome: string;
}
export interface CategoriaWalletFormEntity {
  id: number;
  nome: string;
}

export interface FornecedorWalletFormEntity {
  id: number;
  nome: string;
}


export interface DashbBoarWallet {
  qtd_aberto: number;
  total_aberto: number;
  qtd_vencido: number;
  total_vencido: number;
};

export interface DashBoardResumo {
  total_entrada: number;
  total_saida: number;
  saldo: number;
}

export interface DashBoardResumoRegistro {
  id: number;
  data_cadastro: string;
  data_vencimento: string;
  descricao: string;
  cor: string;
  nome: string;
  origem_tipo: string;
  status: string;
  valor_total: number;

}