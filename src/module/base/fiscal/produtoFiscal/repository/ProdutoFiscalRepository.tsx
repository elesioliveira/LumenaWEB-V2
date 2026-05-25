import { api } from "../../../../../shared/HttpManager";
import type { ProdutoFiscalDTO } from "../dto/ProdutoFiscalDTO";
import type { ProdutoFiscalEntity } from "../entity/ProdutoFiscalEntity";

export const createProdutoFiscal = async (dto: ProdutoFiscalDTO) => {
  try {
    const response = await api.post("Post/Create/ProdutoFiscal", dto, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error.response?.data ?? null;
  }
};

export const getProdutoFiscal = async (produtoId: number) => {
  try {
    const response = await api.get(`Get/ProdutoFiscal/${produtoId}`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? null;
  }
};

export const updateProdutoFiscal = async (data: ProdutoFiscalEntity) => {
  try {
    const response = await api.put("Put/Update/ProdutoFiscal", data, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error.response?.data ?? null;
  }
};

export const deleteProdutoFiscal = async (id: number) => {
  try {
    const response = await api.delete(`Delete/ProdutoFiscal/${id}`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error.response?.data ?? null;
  }
};
