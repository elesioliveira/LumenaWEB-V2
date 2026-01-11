export const CurrentWalletTabEnum = {
    FluxoCaixa :0,
    ContasPagar:1,
    ContasReceber:2,
    Categorias:3,
} as const;

export type CurrentWalletTabEnum = typeof CurrentWalletTabEnum[keyof typeof CurrentWalletTabEnum];