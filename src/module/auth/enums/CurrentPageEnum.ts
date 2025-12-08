
export const CurrentPageEnum = {
    Signin :0,
    Register:1,
    ForgotPassword:2
} as const;

export type CurrentPageEnum = typeof CurrentPageEnum[keyof typeof CurrentPageEnum];