import { api } from "../../../../../shared/HttpManager";
import type { MarkDTO } from "../dto/MarkDTO";
import type { MarkEntity } from "../entity/MarkEntity";

export const createMark = async (dto: MarkDTO) => {
try {
    const response = await api.post("Post/Create/Mark", dto, {withCredentials:true});
    return response.data;
} catch (error: any) {
    return error.response.data?? null;
}
}

export const getMark = async (search?: string | null) => {
  try {
    const response = await api.get("Get/Mark", {
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


export const updateMark = async (data: MarkEntity)=> {
    try {
        const response = await api.put("Put/Update/Mark",data , {withCredentials:true});
        return response.data;
    } catch (error:any) {
        return error.response.data??null;
    }
}

