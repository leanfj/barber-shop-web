import React, { useState, useRef, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import notify from "devextreme/ui/notify";
import { type ValidationCallbackData } from "devextreme-react/common";
import { changePassword } from "../../api/auth";

export default function ChangePasswordForm(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ password: "" });
  const params = useParams();
  const [searchParams] = useSearchParams();

  const onSubmit = useCallback(
    async (e: any): Promise<any> => {
      e.preventDefault();
      const { password } = formData.current;
      setLoading(true);
      const resetPasswordToken = searchParams.get("token");
      const usuarioId = searchParams.get("usuarioId");
      const result = await changePassword(
        password,
        resetPasswordToken ?? "",
        usuarioId ?? "",
      );
      setLoading(false);

      if (result.isOk) {
        navigate("/login");
      } else {
        notify(result.message, "error", 2000);
      }
    },
    [navigate, params.recoveryCode],
  );

  const confirmPassword = useCallback(
    ({ value }: ValidationCallbackData) => value === formData.current.password,
    [],
  );

  return (
    <form onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={"password"}
          editorType={"dxTextBox"}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"confirmedPassword"}
          editorType={"dxTextBox"}
          editorOptions={confirmedPasswordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <CustomRule
            message={"Passwords do not match"}
            validationCallback={confirmPassword}
          />
          <Label visible={false} />
        </Item>
        <ButtonItem>
          <ButtonOptions
            width={"100%"}
            type={"default"}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {loading ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "Continue"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
    </form>
  );
}

const passwordEditorOptions = {
  stylingMode: "filled",
  placeholder: "Password",
  mode: "password",
};
const confirmedPasswordEditorOptions = {
  stylingMode: "filled",
  placeholder: "Confirm Password",
  mode: "password",
};
