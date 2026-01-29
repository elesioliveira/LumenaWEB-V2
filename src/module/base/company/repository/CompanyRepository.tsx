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