import { api } from "../../../../shared/HttpManager";
import type {  CategoryModalDTOAPI } from "../dto/WalletDTO";

export const submitNewCategory = async (dto: CategoryModalDTOAPI) => {
    try {
        const response = await api.post("Post/Category/Wallet", dto, {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro.Contate o Administrador."};
    }
};
export const submitUpdateCategory = async (dto: CategoryModalDTOAPI, id: number) => {
    try {
        const response = await api.put(`Put/Category/Wallet/${id}`, dto, {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro.Contate o Administrador."};
    }
};

export const fetchCategory = async  (nome: string | null, tipo: string | null) => {
    try {
        const response = await api.get("Get/Category/Wallet", {withCredentials:true, params: {nome:nome?.trim(), tipo:tipo?.trim()}});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
}
export const fetchCategoryActives = async  () => {
    try {
        const response = await api.get("Get/Category/Active", {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
}