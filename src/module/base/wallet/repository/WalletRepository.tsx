import { api } from "../../../../shared/HttpManager";
import type {  CategoryModalDTOAPI, NovaContaDTO } from "../dto/WalletDTO";

export const submitNewCategory = async (dto: CategoryModalDTOAPI) => {
    try {
        const response = await api.post("Post/Category/Wallet", dto, {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro.Contate o Administrador."};
    }
};
export const submitUpdateCategory = async (dto: CategoryModalDTOAPI, id: number) => {
    try {
        const response = await api.put(`Put/Category/Wallet/${id}`, dto, {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro.Contate o Administrador."};
    }
};

export const fetchCategory = async  (nome: string | null, tipo: string | null) => {
    try {
        const response = await api.get("Get/Category/Wallet", {withCredentials:true, params: {nome:nome?.trim(), tipo:tipo?.trim()}});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
}
export const fetchCategoryActives = async  () => {
    try {
        const response = await api.get("Get/Category/Active", {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
}
export const fetchWalletCategoria = async  (search:string, tipo:string) => {
    try {
        const response = await api.get(`Get/Wallet/Categoria`, {withCredentials:true , params:{
            search: search,
            tipo: tipo
        }});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
}
export const fetchContasPagarWallet = async  (search:string, status:string|null, origem: string) => {
    try {
        const response = await api.get(`Get/Wallet/Conta-Pagar`, {withCredentials:true , params:{
            search: search,
            status: status,
            origem: origem
        }});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
}
export const fetchContasWallet = async  (search:string, status:string|null, origem: string) => {
    try {
        const response = await api.get(`Get/Wallet/Conta`, {withCredentials:true , params:{
            search: search,
            status: status,
            origem: origem
        }});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
}

export const postSubmitNewConta = async (dto: NovaContaDTO) => {
    try {
        const response = await api.post(`Post/Wallet/Nova/Conta`,dto , {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
};
export const putSubmitUpdateConta = async (dto: NovaContaDTO, id: number) => {
    try {
        const response = await api.put(`Put/Wallet/Conta/${id}`,dto , {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
};


export const fetchClienteCategoria = async (id_cliente: number, id_categoria: number) => {
    try {
        const response = await api.get(`Get/Wallet/Cliente-Categoria`, {withCredentials:true, params: {
            id_cliente: id_cliente,
            id_categoria: id_categoria
        }});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
};
export const fetchFornecedorCategoria = async (id_fornecedor: number, id_categoria: number) => {
    try {
        const response = await api.get(`Get/Wallet/Fornecedor-Categoria`, {withCredentials:true, params: {
            id_fornecedor: id_fornecedor,
            id_categoria: id_categoria
        }});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
};
export const fetchDashBoardWallet = async (origem_tipo: string) => {
    try {
        const response = await api.get(`Get/Dashboard/Wallet`, {withCredentials:true, params: {
            origem_tipo: origem_tipo,
        }});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
};
export const fetchCategoriaAtiva = async () => {
    try {
        const response = await api.get(`Get/Categorias/Wallet/Ativa`, {withCredentials:true});
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
};

export const fetchDashBoardResumo = async(data_inicio: string, data_fim: string) => {
        try {
        const response = await api.get(`Get/Wallet/Resumo-Financeiro`, {withCredentials:true, params: {
            data_inicio: data_inicio,
            data_fim: data_fim,
                }
            }
        );
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
};
export const fetchDashBoardRegistroResumo = async(data_inicio: string, data_fim: string, receita: string |null, status: string |null, search:string |null) => {
        try {
        const response = await api.get(`Get/Wallet/Resumo-Financeiro-Registros`, {withCredentials:true, params: {
            data_inicio: data_inicio,
            data_fim: data_fim,
            status: status,
            search: search,
            receita: receita,}
            }
        );
        return response.data;
    } catch (error: any) {
        return error.response.data ?? {success:false, message:"Erro. Contate o Administrador."};
    }
};