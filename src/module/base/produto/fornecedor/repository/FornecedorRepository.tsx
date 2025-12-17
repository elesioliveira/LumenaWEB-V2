import { api } from "../../../../../shared/HttpManager";
import type { FornecedorDTO } from "../dto/FornecedorDTO";


export const submitCreateFornecedor = async (dto: FornecedorDTO) => {
try {
    const response = await api.post("Post/Create/Fornecedor", dto, {withCredentials:true});
    return response.data;
} catch (error: any) {
    return error.response.data?? null;
}
}

export const getFornecedor = async (empresaId: number) => {
    try {
    const response = await api.get(`/Get/Fornecedores?empresaId=${empresaId}`, {withCredentials:true});
    return response.data;
} catch (error: any) {
    return error.response.data?? null;
}
}