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
    const data = await AxiosClient.getInstance().post(
      "/authentication/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
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

export async function signOut(email: string): Promise<{ isOk: boolean }> {
  try {
    await AxiosClient.getInstance().post(
      "/authentication/logout",
      {
        email,
      },
      {
        withCredentials: true,
      },
    );

    return {
      isOk: true,
    };
  } catch (error) {
    console.log(error);
    return {
      isOk: false,
    };
  }
}

export async function getUser(): Promise<{
  isOk: boolean;
  data: {
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
    const usuarioId = JSON.parse(localStorage.getItem("usuarioId") ?? "");
    const user = await AxiosClient.getInstance().get(
      `/usuarios/id/${usuarioId}`,
      {
        withCredentials: true,
      },
    );

    return {
      isOk: true,
      data: user.data,
    };
  } catch (error) {
    return {
      isOk: false,
      data: {
        _id: {
          value: "",
        },
        props: {
          nome: "",
          tenantId: "",
          email: "",
          password: "",
          isActive: false,
          dataAtualizacao: "",
          dataCadastro: "",
        },
      },
    };
  }
}

export async function createAccount(
  name: string,
  email: string,
  password: string,
): Promise<{ isOk: boolean; message?: string }> {
  try {
    const data = await AxiosClient.getInstance().post(
      "/usuarios",
      {
        nome: name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    console.log(data);
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

export async function activateAccount(
  usuarioId: string,
  token: string,
): Promise<{ isOk: boolean; message?: string; data?: any }> {
  try {
    // Send request
    const user = await AxiosClient.getInstance().get(
      `/usuarios/${usuarioId}/activate/${token}`,
      {
        withCredentials: true,
      },
    );

    return {
      isOk: true,
      data: user.data,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to activate account",
    };
  }
}
