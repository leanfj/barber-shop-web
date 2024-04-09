import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  getUser,
  signIn as sendSignInRequest,
  activateAccount,
  signOut as sendSignOutRequest,
} from "../api/auth";
import type { User, AuthContextType } from "../types";
// import { Cookies } from "react-cookie";

function AuthProvider(props: React.PropsWithChildren<unknown>): JSX.Element {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async function () {
      const result = await getUser();
      if (result.isOk && result.data) {
        setUser(result.data);
      }

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{
      isOk: boolean;
      data?: User | undefined;
      message?: string | undefined;
    }> => {
      const result = await sendSignInRequest(email, password);
      const user = await getUser();

      if (result.isOk && result.data?.token.props.usuarioId) {
        if (!user.isOk) {
          return {
            isOk: false,
            message: "Failed to get user data",
          };
        }

        setUser(user.data);
      } else {
        return {
          isOk: false,
          message: result.message,
        };
      }

      return {
        isOk: true,
        data: user as any,
        message: "",
      };
    },
    [],
  );

  const signOut = useCallback(async () => {
    const user = await getUser();

    if (!user) {
      return;
    }

    // new Cookies().remove("token");

    await sendSignOutRequest(user.data.props.email);

    setUser(undefined);
  }, []);

  const activation = useCallback(
    async (usuarioId: string, token: string) => {
      const result = await activateAccount(usuarioId, token);

      if (result.isOk && result.data?.token.props.usuarioId) {
        return {
          isOk: true,
          message: result.message,
        };
      }
      return {
        isOk: false,
        message: "Failed to get user data",
      };
    },

    [],
  );

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, loading, activation }}
      {...props}
    />
  );
}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: undefined,
  signIn: async () => ({ isOk: false }),
  signOut: () => {},
  activation: async () => ({ isOk: false }),
} satisfies AuthContextType);
const useAuth = (): AuthContextType => useContext(AuthContext);

export { AuthProvider, useAuth };
