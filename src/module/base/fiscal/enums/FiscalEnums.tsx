export const CurrentSubModuleFiscal = {
  Cfop: 0,
  RegraFiscal: 1,
  NotasFiscais: 2,
  Configuracao: 3,
} as const;

export type CurrentSubModuleFiscal = typeof CurrentSubModuleFiscal[keyof typeof CurrentSubModuleFiscal];
