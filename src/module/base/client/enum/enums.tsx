export const CurrentClientPageEnum = {
    Client :0,
    GroupClient:1,
} as const;

export type CurrentClientPageEnum = typeof CurrentClientPageEnum[keyof typeof CurrentClientPageEnum];