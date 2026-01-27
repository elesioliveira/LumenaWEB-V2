export const CurrentTabCompany = {
    DetailsCompany :0,
    Users :1,
} as const;

export type CurrentTabCompany = typeof CurrentTabCompany[keyof typeof CurrentTabCompany];