
export const typeofStatus = (status: string): string => {
  switch (status) {
    case "Aprovado":
      return "#00FF9C"; // neon green

    case "Pendente":
      return "#FFD300"; // neon yellow

    case "Em separação":
      return "#00B3FF"; // neon blue

    case "Enviado":
      return "#B400FF"; // neon purple

    case "Entregue":
      return "#00FFD1"; // neon cyan

    case "Cancelada":
      return "#FF2E2E"; // neon red

    default:
      return "#9CA3AF"; // neutral gray
  }
};

export const typeofStatusBg = (status: string): string => {
  switch (status) {
    case "Aprovado":
      return "rgba(0, 255, 156, 0.15)";

    case "Pendente":
      return "rgba(255, 211, 0, 0.18)";

    case "Em separação":
      return "rgba(0, 179, 255, 0.18)";

    case "Enviado":
      return "rgba(180, 0, 255, 0.18)";

    case "Entregue":
      return "rgba(0, 255, 209, 0.18)";

    case "Cancelada":
      return "rgba(255, 46, 46, 0.18)";

    default:
      return "rgba(156, 163, 175, 0.15)";
  }
};
