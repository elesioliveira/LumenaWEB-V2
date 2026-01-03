import { api } from "../../../../shared/HttpManager"
import type { NewSaleDTO } from "../dto/SaleDTO";


export const fetchFormSale = async () => {
    try {
        const response = await api.get("Get/Form/Sale", {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? null;
    }
}

export const fetchClient = async(search: string) => {
    try {
        const response = await api.get("Get/Sales/Client", {withCredentials: true, params:{search: search}});
        return response.data;
    } catch (e:any) {
        return e.response.data ?? null;
    }
};

export const fetchProductByGtinOrNameSales = async(search: string) => {
  try {
    const response = await api.get("Get/Sales/Product", {
      withCredentials: true,
    params: {search: search.trim()}
    },)
    return response.data;
  } catch (error: any) {
    return error?.response.data ??  new Error("Erro. Contate o administrador");
  }
};

export const submitNewSale = async(dto: NewSaleDTO) => {
try {
  const response = await api.post("Post/NewSale", dto, {withCredentials:true});
  return response.data;
} catch (error: any) {
  return error.response.data ??  new Error("Erro. Não foi possível cadastrar uma nova venda.");
}
};

export const updateSubmitSale = async(dto: NewSaleDTO, saleId: number) => {
try {
  const response = await api.put(`Put/UpdateSale/${saleId}`, dto, {withCredentials:true});
  return response.data;
} catch (error: any) {
  return error.response.data ??  new Error("Erro. Não foi possível cadastrar uma nova venda.");
}
};

export const cancelSubmitSale = async (saleId: number) => {
  try {
    const response = await api.put(
      `Put/CancelSale/${saleId}`,
      null, //  body vazio
      { withCredentials: true } // config correta
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data ?? {
      success: false,
      message: "Erro ao cancelar pedido.",
    };
  }
};


export const fetchSale = async(search?: string) => {
  try {
    const response = await api.get("Get/Sale", {withCredentials:true, params:{search: search}});
    return response.data;
  } catch (error: any) {
    return error.reponse.data ?? new Error("Erro. Contate o administrador.");
  }
};


export const fetchSaleDetails= async(saleId?: number) => {
  try {
    const response = await api.get(`Get/SaleDetails/${saleId}`, {withCredentials:true});
    return response.data;
  } catch (error: any) {
    return error.response.data ?? new Error("Não foi possível encontrar nenhum pedido.");
  }
};