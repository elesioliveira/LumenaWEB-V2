import { createContext, useContext } from "react";
import { useSalesController } from "../controller/SalesController";

const SalesContext = createContext<ReturnType<typeof useSalesController> | null>(null);

export function SalesProvider({children}: {children: React.ReactNode}) {
    const controller = useSalesController();

    return (
        <SalesContext.Provider value={controller}>
            {children}</SalesContext.Provider>
    );
}
export const useSales = () => {
    const context = useContext(SalesContext);
    if (!context) throw new Error("useSales deve estar dentro de SalesProvider");
    return context;
}