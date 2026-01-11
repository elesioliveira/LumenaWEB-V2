export interface StatusNeonStyle {
  color: string;
  background: string;
}

export const getStatusNeonBgColor = (status: string) => {
  switch (status) {
    case "Pago":
    case "Recebido":
      return "rgba(0, 255, 156, 0.18)";

    case "Pendente":
      return "rgba(255, 211, 0, 0.18)";

    case "Vencido":
      return "rgba(255, 46, 46, 0.18)";

    default:
      return "rgba(156, 163, 175, 0.15)";
  }
};


export const getStatusNeonFontStyle = (status: string) => {
  switch (status) {
    case "Pago":
    case "Recebido":
      return   "#00FF9C";

    case "Pendente":
      return "#FFD300";

    case "Vencido":
      return "#FF2E2E";

    default:
      return "#9CA3AF";
  }
};
