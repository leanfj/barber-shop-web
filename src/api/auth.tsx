// import defaultUser from "../utils/default-user";
// import { AxiosError } from "axios";
import { AxiosClient } from "./axiosClient";

export async function signIn(
  email: string,
  password: string,
): Promise<{
  isOk: boolean;
  data?: {
    token: {
      _id: {
        value: string;
      };
      props: {
        dataExpiracao: {
          props: {
            value: string;
          };
        };
        usuarioId: string;
        tenantId: string;
        dataCadastro: string;
        dataAtualizacao: string;
        token: {
          props: {
            value: string;
          };
        };
      };
    };
    refreshToken: string;
  };
  message?: string;
}> {
  try {
    const data = await AxiosClient.getInstance().post("/authentication/login", {
      email,
      password,
    });

    localStorage.setItem(
      "token",
      JSON.stringify(data.data.token.props.token.props.value),
    );
    localStorage.setItem(
      "usuarioId",
      JSON.stringify(data.data.token.props.usuarioId),
    );

    return {
      isOk: true,
      data: data.data,
    };
  } catch (error) {
    console.log(error);
    return {
      isOk: false,
      message: "Authentication failed",
    };
  }
}

export async function getUser(): Promise<{
  isOk: boolean;
  data?: {
    _id: {
      value: string;
    };
    props: {
      nome: string;
      tenantId: string;
      email: string;
      password: string;
      isActive: boolean;
      dataAtualizacao: string;
      dataCadastro: string;
    };
  };
}> {
  try {
    const token = JSON.parse(localStorage.getItem("token") ?? "");
    const usuarioId = JSON.parse(localStorage.getItem("usuarioId") ?? "");
    const user = await AxiosClient.getInstance().get(
      `/usuarios/id/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      isOk: true,
      data: user.data,
    };
  } catch (error) {
    console.log(error);
    return {
      isOk: false,
    };
  }
}

export async function createAccount(
  email: string,
  password: string,
): Promise<{ isOk: boolean; message?: string }> {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(
  email: string,
  recoveryCode?: string,
): Promise<{ isOk: boolean; message?: string }> {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(
  email: string,
): Promise<{ isOk: boolean; message?: string }> {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}
