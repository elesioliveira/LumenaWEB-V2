import { categoriasCores, tipoReceita } from "../mocks/WalletMocks";

export interface StatusNeonStyle {
  color: string;
  background: string;
}

export const getStatusNeonBgColor = (status: string) => {
  switch (status) {
    case "Pago":
    case "Recebido":
    case "Concluído":
    case "Gerente":
      return "rgba(0, 255, 156, 0.18)";

    case "Pendente":
    case "Usuário":
    case "Vendedor":
      return "rgba(255, 211, 0, 0.18)";

    case "Vencido":
    case "Cancelado":
    case "Administrador":
      return "rgba(255, 46, 46, 0.18)";

    default:
      return "rgba(156, 163, 175, 0.15)";
  }
};


export const getStatusNeonFontStyle = (status: string) => {
  switch (status) {
    case "Pago":
    case "Recebido":
    case "Concluído":
    case "Gerente":
      return   "#00FF9C";

    case "Pendente":
    case "Usuário":
    case "Vendedor":
      return "#FFD300";

    case "Vencido":
    case "Cancelado":
    case "Administrador":
      return "#FF2E2E";

    default:
      return "#9CA3AF";
  }
};

export const getCategoriabgColorNeonStylr = (status: string) => {
  switch (status) {
    case "Despesa":
      return "rgba(255, 46, 46, 0.18)";
    case "Receita":
      return "rgba(0, 255, 156, 0.18)";
    
  
    default:
      return "rgba(156, 163, 175, 0.15)";
    
  }
}
export const getCategoriaFontNeonStylr = (status: string) => {
  switch (status) {
    case "Despesa":
      return "#FF2E2E";
    case "Receita":
      return "#00FF9C";
    
  
    default:
      return "#9CA3AF";
    
  }
}


export const getTipoReceita = (id: number)=> {
  return tipoReceita.find((r) => r.id === id) ;
};

export const getCor = (id: number) => {
  return categoriasCores.find((c) => c.id === id);
}