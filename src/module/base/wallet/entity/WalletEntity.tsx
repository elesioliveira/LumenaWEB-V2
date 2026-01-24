
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


export interface DashbBoarWallet {
  qtd_aberto: number;
  total_aberto: number;
  qtd_vencido: number;
  total_vencido: number;
};