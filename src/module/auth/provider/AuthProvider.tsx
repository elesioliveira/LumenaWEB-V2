import { createContext, useContext } from "react";
import { useAuthController } from "../controller/AuthController";

const AuthContext = createContext<ReturnType<typeof useAuthController> | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const controller = useAuthController();

    return(
  <AuthContext.Provider value={controller}>
    {children}
    </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth deve estar dentro de AuthProvider");
    return context;
}