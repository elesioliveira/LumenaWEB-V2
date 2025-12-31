
export const typeofStatus = (status: string): string => {
  switch (status) {
    case "Finalizado":
      return "#22c55e"; // verde

    case "Pendente":
      return "#f59f0a"; // amarelo

    case "Em Separação":
      return "#0441a3ff"; // azul

    case "Faturado":
      return "#9300f5ff"; // indigo

    case "Cancelado":
      return "#fa0000ff"; // vermelho

    default:
      return "#9ca3af"; // cinza (fallback)
  }
};
export const typeofStatusBg = (status: string): string => {
  switch (status) {
    case "Finalizado":
      return "#8dddaa77"; // verde

    case "Pendente":
      return "#ecc786a1"; // amarelo

    case "Em Separação":
      return "#88b2f59a"; // azul

    case "Faturado":
      return "#d699ee9c"; // indigo

    case "Cancelado":
      return "#f5525271"; // vermelho

    default:
      return "#9ca3af"; // cinza (fallback)
  }
};
