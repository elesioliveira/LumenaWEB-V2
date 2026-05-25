/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../../shared/HttpManager";

export const fetchAnaliseData = async () => {
    try {
        const response = await api.get("Get/Analise", {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o administrador."};
    }
}