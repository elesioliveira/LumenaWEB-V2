import { api } from "../../../../../shared/HttpManager";
import type { EntregaDTO } from "../dto/EntregaDTO";
import type { EntregaEntity } from "../entity/EntregaEntity";

export const createEntrega = async (dto: EntregaDTO) => {
try {
    const response = await api.post("Post/Create/Entrega", dto, {withCredentials:true});
    return response.data;
} catch (error: any) {
    return error.response.data?? null;
}
}

export const getEntrega = async (search?: string | null) => {
  try {
    const response = await api.get("Get/Entrega", {
      withCredentials: true,
      params: {
        search: search?.trim() || undefined,
      },
    });

    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? null;
  }
};


export const updateEntrega = async (data: EntregaEntity)=> {
    try {
        const response = await api.put("Put/Update/Entrega",data , {withCredentials:true});
        return response.data;
    } catch (error:any) {
        return error.response.data??null;
    }
}

