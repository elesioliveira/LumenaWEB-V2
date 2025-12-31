export const CurrentFornecedorPage = {
    Movimemovement :0,
    Entry:1,
    Output:2,
} as const;

export type CurrentFornecedorPage = typeof CurrentFornecedorPage[keyof typeof CurrentFornecedorPage];