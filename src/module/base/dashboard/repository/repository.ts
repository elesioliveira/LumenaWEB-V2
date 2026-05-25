/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "../../../../shared/HttpManager";

export const fetchDashboard = async () => {
    try {
        const response = await api.get("Get/Dashboard", {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message: "Erro. Contate o administrador"};
    }
}