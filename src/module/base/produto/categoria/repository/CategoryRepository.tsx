import { api } from "../../../../../shared/HttpManager";
import type { CategoryDTO } from "../dto/CategoryDTO";
import type { CategoryEntity } from "../entity/CategoryEntity";

export const createCategory = async (dto: CategoryDTO) => {
try {
    const response = await api.post("Post/Create/Category", dto, {withCredentials:true});
    return response.data;
} catch (error: any) {
    return error.response.data?? null;
}
}

export const getCategory = async (search?: string | null) => {
  try {
    const response = await api.get("Get/Category", {
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


export const updateCategory = async (data: CategoryEntity)=> {
    try {
        const response = await api.put("Put/Update/Category",data , {withCredentials:true});
        return response.data;
    } catch (error:any) {
        return error.response.data??null;
    }
}

