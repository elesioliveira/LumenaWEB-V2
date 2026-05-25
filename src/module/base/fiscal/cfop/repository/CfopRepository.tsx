import { api } from "../../../../../shared/HttpManager";
import type { CfopDTO } from "../dto/CfopDTO";
import type { CfopEntity } from "../entity/CfopEntity";

export const createCfop = async (dto: CfopDTO) => {
  try {
    const response = await api.post("Post/Create/Cfop", dto, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error.response?.data ?? null;
  }
};

export const getCfops = async (tipo_operacao?: string | null) => {
  try {
    const response = await api.get("Get/Cfop", {
      withCredentials: true,
      params: { tipo_operacao: tipo_operacao?.trim() || undefined },
    });
    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? null;
  }
};

export const updateCfop = async (data: CfopEntity) => {
  try {
    const response = await api.put("Put/Update/Cfop", data, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error.response?.data ?? null;
  }
};

export const deleteCfop = async (id: number) => {
  try {
    const response = await api.delete(`Delete/Cfop/${id}`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error.response?.data ?? null;
  }
};
