import { api } from "../../../../../shared/HttpManager";
import type { ProductDTO } from "../dto/ProdutoDTO";
import type { ProductEntity } from "../entity/ProductEntity";

export const createProduct = async (dto: ProductDTO) => {
try {
    const response = await api.post("Post/Create/Product", dto, {withCredentials:true});
    return response.data;
} catch (error: any) {
    return error.response.data?? null;
}
}

export const getProduct = async (search?: string | null) => {
  try {
    const response = await api.get("Get/Product", {
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


export const updateProduct = async (data: ProductEntity)=> {
    try {
        const response = await api.put("Put/Update/Product",data , {withCredentials:true});
        return response.data;
    } catch (error:any) {
        return error.response.data??null;
    }
}


export const getFormProduct = async () => {
  try {
    const response = await api.get("Get/Product/Form", { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? null;
  }
}