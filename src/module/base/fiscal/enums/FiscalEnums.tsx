export const CurrentSubModuleFiscal = {
  Cfop: 0,
  RegraFiscal: 1,
} as const;

export type CurrentSubModuleFiscal = typeof CurrentSubModuleFiscal[keyof typeof CurrentSubModuleFiscal];
