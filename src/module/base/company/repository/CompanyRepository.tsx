import { api } from "../../../../shared/HttpManager";

export const fetchDetailsCompany = async ()=> {
    try {
        const response = await api.get("Get/Company", {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message: "Erro. Contate o administrador"};
    }
};