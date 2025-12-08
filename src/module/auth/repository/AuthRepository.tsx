import { api } from "../../../shared/HttpManager";
import type { CompanyEntityRegister } from "../entities/AuthEntities";


export const createCompany = async (company: CompanyEntityRegister) => {
  try {
    const response = await api.post("/Post/Empresa", company,
  { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? null;
  }
};
