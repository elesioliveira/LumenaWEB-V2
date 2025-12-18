export const CurrentPageHome = {
    Product :0,
    supplier:1,
    Category:2,
    Mark:3,
    SalesChannel:4,
    Delivery:5
} as const;

export type CurrentPageHome = typeof CurrentPageHome[keyof typeof CurrentPageHome];