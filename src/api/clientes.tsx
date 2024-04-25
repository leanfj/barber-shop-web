// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { AxiosClient } from "./axiosClient";

export interface Cliente {
  id: string;
  tenantId: string;
  nome: string;
  cpf: string;
  dataNascimento: Date;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  genero: string;
  cep: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
}

export async function get(params: any): Promise<{
  isOk: boolean;
  data: Cliente[] | null | string;
  totalCount?: number;
}> {
  try {
    console.log(params);
    const clientes = await AxiosClient.getInstance().get(`/clientes${params}`, {
      withCredentials: true,
    });

    return {
      isOk: true,
      data: clientes.data.data,
      totalCount: clientes.data.total,
    };
  } catch (error: AxiosError | any) {
    return {
      isOk: false,
      data: error.response.data.message,
    };
  }
}
