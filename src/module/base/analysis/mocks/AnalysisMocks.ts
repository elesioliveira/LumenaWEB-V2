export interface KpiAnalitico {
  label: string;
  value: string;
  variacao: number;
  descricao: string;
}

export interface VendaPorCanal {
  canal: string;
  faturamento: number;
  pedidos: number;
}

export interface MargemProduto {
  nome: string;
  preco_custo: number;
  preco_venda: number;
  margem: number;
  qtd_vendida: number;
}

export interface CurvaABC {
  classificacao: "A" | "B" | "C";
  percentual_faturamento: number;
  qtd_produtos: number;
  cor: string;
}

export interface EvolucaoMensal {
  mes: string;
  receita_atual: number;
  receita_anterior: number;
  pedidos_atual: number;
  pedidos_anterior: number;
}

export interface TopCliente {
  nome: string;
  total_gasto: number;
  qtd_pedidos: number;
  ultimo_pedido: string;
}

export interface AlertaInteligente {
  tipo: "warning" | "success" | "error" | "info";
  mensagem: string;
}

export const kpisAnaliticos: KpiAnalitico[] = [
  {
    label: "Ticket Médio",
    value: "R$ 487,30",
    variacao: 8.2,
    descricao: "Valor médio por pedido",
  },
  {
    label: "Margem de Lucro",
    value: "34,7%",
    variacao: 2.1,
    descricao: "Margem média sobre vendas",
  },
  {
    label: "Taxa de Conversão",
    value: "78,5%",
    variacao: -3.4,
    descricao: "Pedidos aprovados / total",
  },
  {
    label: "Inadimplência",
    value: "12,3%",
    variacao: -1.8,
    descricao: "Contas vencidas / a receber",
  },
];

export const vendasPorCanal: VendaPorCanal[] = [
  { canal: "Loja Física", faturamento: 48500, pedidos: 95 },
  { canal: "E-commerce", faturamento: 37200, pedidos: 78 },
  { canal: "Marketplace", faturamento: 28900, pedidos: 62 },
  { canal: "WhatsApp", faturamento: 15600, pedidos: 34 },
  { canal: "Instagram", faturamento: 9800, pedidos: 21 },
];

export const margemProdutos: MargemProduto[] = [
  { nome: "Camiseta Premium", preco_custo: 28.0, preco_venda: 89.9, margem: 68.9, qtd_vendida: 245 },
  { nome: "Tênis Runner X", preco_custo: 120.0, preco_venda: 349.9, margem: 65.7, qtd_vendida: 87 },
  { nome: "Bolsa Couro Eco", preco_custo: 65.0, preco_venda: 179.9, margem: 63.9, qtd_vendida: 132 },
  { nome: "Óculos Solar Pro", preco_custo: 42.0, preco_venda: 109.9, margem: 61.8, qtd_vendida: 198 },
  { nome: "Relógio Smart Fit", preco_custo: 180.0, preco_venda: 459.9, margem: 60.9, qtd_vendida: 54 },
  { nome: "Perfume Essence", preco_custo: 35.0, preco_venda: 85.0, margem: 58.8, qtd_vendida: 310 },
  { nome: "Mochila Urban", preco_custo: 55.0, preco_venda: 129.9, margem: 57.7, qtd_vendida: 167 },
  { nome: "Jaqueta Windbreak", preco_custo: 95.0, preco_venda: 219.9, margem: 56.8, qtd_vendida: 73 },
  { nome: "Carteira Slim", preco_custo: 22.0, preco_venda: 49.9, margem: 55.9, qtd_vendida: 420 },
  { nome: "Boné Street", preco_custo: 15.0, preco_venda: 32.9, margem: 54.4, qtd_vendida: 580 },
];

export const curvaABC: CurvaABC[] = [
  { classificacao: "A", percentual_faturamento: 80, qtd_produtos: 12, cor: "#f59f0a" },
  { classificacao: "B", percentual_faturamento: 15, qtd_produtos: 25, cor: "#197DFA" },
  { classificacao: "C", percentual_faturamento: 5, qtd_produtos: 48, cor: "#94a3b8" },
];

export const evolucaoMensal: EvolucaoMensal[] = [
  { mes: "Jan", receita_atual: 42000, receita_anterior: 38000, pedidos_atual: 86, pedidos_anterior: 74 },
  { mes: "Fev", receita_atual: 38500, receita_anterior: 35200, pedidos_atual: 79, pedidos_anterior: 68 },
  { mes: "Mar", receita_atual: 51200, receita_anterior: 44800, pedidos_atual: 105, pedidos_anterior: 89 },
  { mes: "Abr", receita_atual: 47800, receita_anterior: 42100, pedidos_atual: 98, pedidos_anterior: 82 },
  { mes: "Mai", receita_atual: 55300, receita_anterior: 46500, pedidos_atual: 113, pedidos_anterior: 91 },
  { mes: "Jun", receita_atual: 49700, receita_anterior: 43800, pedidos_atual: 102, pedidos_anterior: 86 },
  { mes: "Jul", receita_atual: 58100, receita_anterior: 48200, pedidos_atual: 119, pedidos_anterior: 94 },
  { mes: "Ago", receita_atual: 62400, receita_anterior: 51300, pedidos_atual: 128, pedidos_anterior: 101 },
  { mes: "Set", receita_atual: 56800, receita_anterior: 49700, pedidos_atual: 116, pedidos_anterior: 97 },
  { mes: "Out", receita_atual: 64200, receita_anterior: 53100, pedidos_atual: 132, pedidos_anterior: 104 },
  { mes: "Nov", receita_atual: 71500, receita_anterior: 58900, pedidos_atual: 146, pedidos_anterior: 115 },
  { mes: "Dez", receita_atual: 82300, receita_anterior: 67400, pedidos_atual: 169, pedidos_anterior: 132 },
];

export const topClientes: TopCliente[] = [
  { nome: "Empresa Vision", total_gasto: 34500, qtd_pedidos: 28, ultimo_pedido: "2026-05-22" },
  { nome: "Tech Solutions", total_gasto: 28900, qtd_pedidos: 19, ultimo_pedido: "2026-05-20" },
  { nome: "Grupo Atlas", total_gasto: 24200, qtd_pedidos: 15, ultimo_pedido: "2026-05-18" },
  { nome: "Logística Express", total_gasto: 19800, qtd_pedidos: 12, ultimo_pedido: "2026-05-15" },
  { nome: "Indústria Omega", total_gasto: 17600, qtd_pedidos: 9, ultimo_pedido: "2026-05-10" },
];

export const alertasInteligentes: AlertaInteligente[] = [
  { tipo: "warning", mensagem: "3 produtos com estoque abaixo do mínimo" },
  { tipo: "error", mensagem: "5 contas a receber vencem nos próximos 7 dias (R$ 8.450)" },
  { tipo: "success", mensagem: "Vendas cresceram 18,9% este mês vs. mês anterior" },
  { tipo: "info", mensagem: "Canal WhatsApp teve aumento de 42% no faturamento" },
  { tipo: "warning", mensagem: "Margem do produto 'Boné Street' caiu 8% no último mês" },
  { tipo: "success", mensagem: "Taxa de inadimplência reduziu 1,8% este mês" },
];
