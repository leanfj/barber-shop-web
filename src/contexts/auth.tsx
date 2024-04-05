import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { getUser, signIn as sendSignInRequest } from "../api/auth";
import type { User, AuthContextType } from "../types";

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
      if (result.isOk && result.data?.token.props.usuarioId) {
        const user = await getUser();

        if (!user.isOk) {
          return {
            isOk: false,
            message: "Failed to get user data",
          };
        }

        setUser(user.data);
      }

      return {
        isOk: true,
        data: user,
        message: "",
      };
    },
    [],
  );

  const signOut = useCallback(() => {
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, loading }}
      {...props}
    />
  );
}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: undefined,
  signIn: async () => ({ isOk: false }),
  signOut: () => {},
} satisfies AuthContextType);
const useAuth = (): AuthContextType => useContext(AuthContext);

export { AuthProvider, useAuth };
