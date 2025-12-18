import { api } from "../../../../../shared/HttpManager";
import type { CanalVendaDTO } from "../dto/CanalVendaDTO";
import type { CanalVendaEntity } from "../entity/CanalVendaEntity";

export const createCanalVenda = async (dto: CanalVendaDTO) => {
try {
    const response = await api.post("Post/Create/CanalVenda", dto, {withCredentials:true});
    return response.data;
} catch (error: any) {
    return error.response.data?? null;
}
}

export const getCanalVenda = async (search?: string | null) => {
  try {
    const response = await api.get("Get/CanalVenda", {
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


export const updateCanalVenda = async (data: CanalVendaEntity)=> {
    try {
        const response = await api.put("Put/Update/CanalVenda",data , {withCredentials:true});
        return response.data;
    } catch (error:any) {
        return error.response.data??null;
    }
}

