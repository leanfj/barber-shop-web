import React, { /* useCallback, */ useEffect } from "react";
import { /* useNavigate, */ useSearchParams } from "react-router-dom";
import LoadIndicator from "devextreme-react/load-indicator";
import { useAuth } from "../../contexts/auth";
// import notify from "devextreme/ui/notify";

export default function ActivationAccount(): JSX.Element {
  const { activation } = useAuth();
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const usuarioId = searchParams.get("usuarioId");

    console.log(token, usuarioId);

    if (!token || !usuarioId) {
      return;
    }

    activation(usuarioId, token)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // if (result.isOk) {
    //   // navigate("/login");
    // } else {
    //   notify("Fail to Activation", "error", 2000);
    // }
  }, []);

  return <LoadIndicator width={"24px"} height={"24px"} visible={true} />;
}
