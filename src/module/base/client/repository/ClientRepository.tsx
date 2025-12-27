import axios from "axios";
import type { EnderecoByCepResponse } from "../entity/ClientEntity";

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
