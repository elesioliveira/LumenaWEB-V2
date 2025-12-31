export const CurrentSaleViewEnum = {
    Order :0,
    NewSale:1,
} as const;

export type CurrentSaleViewEnum = typeof CurrentSaleViewEnum[keyof typeof CurrentSaleViewEnum];