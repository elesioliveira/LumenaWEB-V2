// src/shared/utils/MaskUtils.ts

/**
 * Formata um CPF: 12345678900 -> 123.456.789-00
 */
export function maskCPF(value: string): string {
  return value
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/**
 * Formata um CNPJ: 12345678000199 -> 12.345.678/0001-99
 */
export function maskCNPJ(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

/**
 * Formata CPF ou CNPJ automaticamente (detecta pelo tamanho)
 */
export function maskCpfCnpj(value: string): string {
  const numeric = value.replace(/\D/g, "");
  return numeric.length <= 11 ? maskCPF(value) : maskCNPJ(value);
}

/**
 * Formata um número de telefone: 11987654321 -> (11) 98765-4321
 */
export function maskTelefone(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d{4})$/, "$1-$2");
}

/**
 * Formata CEP: 12345678 -> 12345-678
 */
export function maskCEP(value: string): string {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
}

/**
 * Formata placa de veículo: ABC1234 -> ABC-1234
 */
export function maskPlaca(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/^([A-Z]{3})(\d{1,4})$/, "$1-$2");
}

/**
 * Formata valor monetário (Real): 1234.5 -> R$ 1.234,50
 */
export function maskCurrency(value: string | number): string {
  const num = typeof value === "number" ? value : parseFloat(value.replace(/\D/g, "")) / 100;
  if (isNaN(num)) return "R$ 0,00";

  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * Remove qualquer máscara e retorna apenas os dígitos
 */
export function unmask(value: string): string {
  return value.replace(/\D/g, "");
}

export function maskQuilometragem(value: string): string {
  if (!value) return "";

  // remove tudo que não for número
  const numericValue = value.replace(/\D/g, "");

  // adiciona separador de milhar com ponto
  const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // adiciona sufixo " km" se houver número
  return formatted;
}   

export const formatDateTime = (
  value?: string | Date,
  withHour: boolean = true
) => {
  if (!value) return "-";

  let date: Date;

  if (typeof value === "string" && value.length === 10) {
    // YYYY-MM-DD → cria data local
    const [year, month, day] = value.split("-").map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = new Date(value);
  }

  if (withHour) {
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};


export const parseCurrencyBR = (value: string) => {
  return Number(
    value
      .replace(/\./g, "")
      .replace(",", ".")
      .replace("R$", "")
      .trim()
  );
};