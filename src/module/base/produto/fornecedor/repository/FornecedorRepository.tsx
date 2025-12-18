import { api } from "../../../../../shared/HttpManager";
import type { FornecedorDTO } from "../dto/FornecedorDTO";
import type { FornecedorEntity } from "../entity/FornecedorEntity";


export const submitCreateFornecedor = async (dto: FornecedorDTO) => {
try {
    const response = await api.post("Post/Create/Fornecedor", dto, {withCredentials:true});
    return response.data;
} catch (error: any) {
    return error.response.data?? null;
}
}

export const getFornecedor = async (search?: string | null) => {
  try {
    const response = await api.get("/Get/Fornecedores", {
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


export const updateFornecedor = async (data: FornecedorEntity)=> {
    try {
        const response = await api.put("Put/Update/Fornecedor",data , {withCredentials:true});
        return response.data;
    } catch (error:any) {
        return error.response.data??null;
    }
}

export const getFornecedorByCNPJ = async (cnpj: string) => {
    try {
        const response = await api.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        return {
      success: true,
      data: response.data,
    };
    } catch (error: any) {
       return {
      success: false,
      message:
        error?.response?.data?.message ?? "Erro ao buscar CNPJ.",
    };
    }
}