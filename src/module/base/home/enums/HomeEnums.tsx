export const CurrentSubModuleProduct = {
    Product :0,
    supplier:1,
    Category:2,
    Mark:3,
    SalesChannel:4,
    Delivery:5
} as const;

export type CurrentSubModuleProduct = typeof CurrentSubModuleProduct[keyof typeof CurrentSubModuleProduct];

export const CurrentModulePage = {
    Dashboard :0,
    Sales:1,
    Product:2,
    Client:3,
    Financial:4,
    Stock:5,
    Reports:6,
    Analysis:7,
    Company:8,
    Settings:9
} as const;

export type CurrentModulePage = typeof CurrentModulePage[keyof typeof CurrentModulePage];


