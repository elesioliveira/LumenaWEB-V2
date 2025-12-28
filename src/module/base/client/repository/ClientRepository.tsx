import axios from "axios";
import type { ClientDetailsEntity, EnderecoByCepResponse } from "../entity/ClientEntity";
import type { ClientDTO, ClientStatusDTO, GroupDTO } from "../dto/ClientDTO";
import { api } from "../../../../shared/HttpManager";

export const fetchEnderecoByCep = async (
  cep: string
): Promise<EnderecoByCepResponse> => {
  try {
    const response = await axios.get<EnderecoByCepResponse>(
      `https://brasilapi.com.br/api/cep/v1/${cep}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar endereço pelo CEP");
  }
};


export const createGroupClient = async(dto: GroupDTO) => {
  try {
    const response = await api.post("Post/Create/GrupoCliente", dto, {
      withCredentials:true
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export const getGroupClient = async(search?: string, ativo?: boolean) => {
  try {
    const response = await api.get("Get/GrupoCliente", {
      withCredentials: true,
      params:  { search: search?.trim(), ativo: ativo} ,
    });

    return response.data;
  } catch (error: any) {
    return error?.response?.data ?? {
      success: false,
      message: "Erro. Contate o administrador",
    };
  }
}

export const updateGroupClient = async(dto: GroupDTO, id: number) => {
  try {
    const response = await api.put(`Put/Update/GrupoCliente/${id}`, dto, {withCredentials: true});
    return response.data;
  } catch (error: any) {
    return error.response.data;
  } 
}


export const createClientSubmit= async(dto: ClientDTO) => {
  try {
    const response = await api.post("/Post/Create/Client", dto, {withCredentials:true});
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}
export const getClient= async(search?:string) => {
  try {
    const response = await api.get("Get/Client", {withCredentials:true, params:{search: search?.trim()}});
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}
export const putStatusClient= async(dto: ClientStatusDTO) => {
  try {
    const response = await api.put("Put/Status/Client",dto, {withCredentials:true});
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export const getClientDetails = async (id: number) => {
try {
  const response = await api.get(`Get/Client/ById/${id}`, {withCredentials:true});
  return response.data;
} catch (error: any) {
  return error.response.data;
}
}

export const updateClient = async(dto: ClientDetailsEntity) => {
  try {
    const response = await api.put("Put/Update/Client", dto, {withCredentials: true});
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}