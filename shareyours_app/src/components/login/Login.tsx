import React from "react";
import jwt from "jsonwebtoken";
import * as actions from "../../actions/actions";
import { IMyUser } from "../../interfaces/userInterfaces";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
const { TextInput, Button, Badge } = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  setToken: (token: string) => void;
  setMyUser: (myUser: IMyUser) => void;
}

const Login: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
  const [emailValue, setEmailValue] = React.useState<string>("");
  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
    setError("");
  };
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
    setError("");
  };

  //Get token when user is log in (api/auth)
  const getToken = () => {
    fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue
      })
    }).then(response => {
      if (response.ok) {
        response.text().then(token => {
          localStorage.setItem("token", token);
          props.setToken(token);
          const decoded = jwt.decode(token);
          if (decoded !== null && typeof decoded !== "string") {
            props.setMyUser(decoded);
          }
          props.history.push("/projects");
        });
      } else {
        setError("Correo o contraseña incorrecta");
      }
    });
  };

  return (
    <span>
      <TextInput
        noLayout
        email
        validate
        label="correo electrónico"
        error="Escriba un correo correcto"
        success="¡Bien hecho!"
        value={emailValue}
        onChange={emailChange}
      />

      <TextInput
        noLayout
        password
        validate
        label="contraseña"
        error="Debe tener 4 o más caracteres"
        success="¡Bien hecho!"
        minLength="4"
        value={passwordValue}
        onChange={passwordChange}
      />

      <Button
        className="teal lighten-2"
        floating
        node="a"
        waves="light"
        small
        icon="check"
        onClick={getToken}
      />
      <span>
        <strong> ¡Adelante!</strong>
      </span>
      <Badge className="red-text">{error}</Badge>
    </span>
  );
};

const mapDispatchToProps = {
  setToken: actions.setToken,
  setMyUser: actions.setMyUser
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
