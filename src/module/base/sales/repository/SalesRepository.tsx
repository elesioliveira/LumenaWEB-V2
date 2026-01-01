import { api } from "../../../../shared/HttpManager"


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
}

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
}