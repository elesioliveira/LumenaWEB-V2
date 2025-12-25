import { api } from "../../../../shared/HttpManager";
import type { MovimentarEstoqueDTO } from "../dto/StockDTO";

export const submitMovimentarEstoque = async (dto: MovimentarEstoqueDTO) => {
  try {
    const response = await api.post("Post/MovimentarEstoque", dto, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? null;
  }
};

export const fetchFornecedor = async() => {
  try {
    const response = await api.get("Get/Stock/Fornecedores", {
      withCredentials: true
    })
    return response.data;
  } catch (error: any) {
    return error?.response.data ??  new Error("Erro. Contate o administrador");
    
  }
}

export const fetchProductByGtinOrName = async(search: string) => {
  try {
    const response = await api.get("Get/Stock/Product", {
      withCredentials: true,
    params: {search: search.trim()}
    },)
    return response.data;
  } catch (error: any) {
    return error?.response.data ??  new Error("Erro. Contate o administrador");
  }
}

export const fetchStockEntrada = async (search?: string, tipo?: string) => {
  try {
    const response = await api.get("Get/Stock", {
      withCredentials: true,
      params: search ? { numNota: search.trim(), tipo: tipo?.trim() } : {},
    });

    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? {
      success: false,
      message: "Erro. Contate o administrador",
    };
  }
};


export const fetchStockDetails = async (id: number) => {
   try {
    const response = await api.get("Get/Stock/Detalhe", {
      withCredentials: true,
      params: {movimentacao_id: id},
    });

    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? {
      success: false,
      message: "Erro. Contate o administrador",
    };
  }
}