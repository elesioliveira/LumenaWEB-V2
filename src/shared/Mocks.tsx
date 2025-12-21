export interface IUnidade {
  id: number;
  nome: string;
  fracionado: boolean;
}

export const unidadeMock: IUnidade[] = [
  { id: 1, nome: "Unidade", fracionado: false },
  { id: 2, nome: "Caixa", fracionado: false },
  { id: 3, nome: "Pacote", fracionado: false },
  { id: 4, nome: "Gramas", fracionado: true },
  { id: 5, nome: "Kilogramas", fracionado: true },
  { id: 6, nome: "Litros", fracionado: false },
  { id: 7, nome: "Mililitros", fracionado: true },
  { id: 8, nome: "Metros", fracionado: false },
  { id: 9, nome: "Centímetros", fracionado: true },
];

export const statusAtivoOptions = [
  { key: 1, label: "Ativo", ativo: true },
  { key: 2, label: "Inativo", ativo: false },
];