import { api } from "../../../../shared/HttpManager";
import type { CompanyFORMDTO } from "../dto/ComapnyDTO";


interface UpdateCompanyParams {
  data: CompanyFORMDTO;
  logo?: File | null;
}

export const updateCompany = async ({
  data,
  logo,
}: UpdateCompanyParams) => {
  try {
    const formData = new FormData();

    // 🔹 mapeamento FORM → API
    formData.append("razao_social", data.razao ?? "");
    formData.append("nome_fantasia", data.fantasia ?? "");
    formData.append("cnpj", data.cnpj ?? "");
    formData.append("ie", data.ie ?? "");
    formData.append("im", data.im ?? "");
    formData.append("email", data.email ?? "");
    formData.append("telefone", data.telefone ?? "");
    formData.append("celular", data.celular ?? "");
    formData.append("website", data.website ?? "");
    formData.append("cep", data.cep ?? "");
    formData.append("logradouro", data.logradouro ?? "");
    formData.append("numero", data.numero ?? "");
    formData.append("complemento", data.complemento ?? "");
    formData.append("bairro", data.bairro ?? "");
    formData.append("cidade", data.cidade ?? "");
    formData.append("uf", data.uf ?? "");
    formData.append("observacao", data.observacao ?? "");

    // arquivo (opcional)
    if (logo) {
      formData.append("logo", logo);
    }

    const response = await api.put(
      "Update/Company",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    return (
      error?.response?.data ?? {
        success: false,
        message: "Erro ao atualizar empresa",
      }
    );
  }
};