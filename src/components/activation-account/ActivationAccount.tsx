import React, { /* useCallback, */ useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadIndicator from "devextreme-react/load-indicator";
import { useAuth } from "../../contexts/auth";
import notify from "devextreme/ui/notify";

export default function ActivationAccount(): JSX.Element {
  const { activation } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        const token = searchParams.get("token");
        const usuarioId = searchParams.get("usuarioId");
        if (!token || !usuarioId) {
          return;
        }
        const result = await activation(usuarioId, token);

        return result;
      } catch (error) {
        return {
          isOk: false,
          message: "Fail to Activation",
        };
      }
    };

    fetchData()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {
        notify("Fail to Activation", "error", 2000);
      });
  }, []);

  return <LoadIndicator width={"24px"} height={"24px"} visible={true} />;
}
