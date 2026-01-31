import { api } from "../../../../shared/HttpManager";
import type { UserDTOAPI } from "../dto/ComapnyDTO";

export const fetchDetailsCompany = async ()=> {
    try {
        const response = await api.get("Get/Company", {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message: "Erro. Contate o administrador"};
    }
};
export const fetchUser = async (search: string |null, perfil: string | null,ativo: boolean | null )=> {
    try {
        const response = await api.get("Get/Users", {withCredentials:true, params: {
            search: search,
            perfil: perfil,
            ativo: ativo
        }});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message: "Erro. Contate o administrador"};
    }
};
export const submitCreateUser = async (dto: UserDTOAPI)=> {
    try {
        const response = await api.post("Post/Create/User",dto, {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message: "Erro. Contate o administrador"};
    }
};
export const submitUpdateUser = async (dto: UserDTOAPI, id: number)=> {
    try {
        const response = await api.put(`Put/Update/User/${id}`,dto, {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message: "Erro. Contate o administrador"};
    }
};

export const fetchDashboardUser = async() => {
    try {
        const response = await api.get("Get/Dashboard-Users", {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message: "Erro. Contate o administrador"};
    }
};

export const updateRotaUser = async(rota: number[], id_usuario: number) => {
    try {
        const response = await api.post(`Post/Create/User-Route/${id_usuario}`, rota, {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message: "Erro. Contate o administrador"};
    }
};