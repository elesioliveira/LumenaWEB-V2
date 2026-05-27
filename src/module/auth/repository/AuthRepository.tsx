import { api } from "../../../shared/HttpManager";
import type { CompanyEntityRegister } from "../entities/AuthEntities";


export const createCompany = async (company: CompanyEntityRegister) => {
  try {
    const response = await api.post("Auth/Post/Empresa", company,
  { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? null;
  }
};

export const forgotPassword = async (email: string) => {
try {
  const response = await api.post("Auth/Post/ForgotPassword", email, {withCredentials:true});
  return response.data;
} catch (error: any) {
  return error?.response?.data ?? null;
}
};

export const submitLogin = async (email: string, password: string) => {
  try {
    const response = await api.post(
      "Auth/Login",
      { email, senha: password },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? null;
  }
};

export const submitLogout = async () => {
  try {
    await api.post("Auth/Logout", null, { withCredentials: true });
    return true;
  } catch {
    return false;
  }
};
