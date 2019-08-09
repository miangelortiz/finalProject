import React from "react";
import { IUser } from "../interfaces/userInterfaces";
import * as actions from "../actions/actions";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
const { TextInput, Button, Badge } = require("react-materialize");

interface IPropsGlobal {
  users: IUser[];
  regUser: (user: IUser) => void;
}

const RegisterUser: React.FC<IPropsGlobal & RouteComponentProps> = props => {
  const [emailValue, setEmailValue] = React.useState<string>("");
  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [userNameValue, setUserNameValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
    setError("");
  };
  const userNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(event.currentTarget.value);
    setError("");
  };
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
    setError("");
  };

  //Register user
  const regUser = () => {
    fetch("http://localhost:3000/api/user/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email: emailValue,
        name: userNameValue,
        password: passwordValue
      })
    }).then(response => {
      if (response.ok) {
        response.json().then((user: IUser) => {
          props.regUser(user);
          props.history.push("/");
        });
      } else {
        setError("Ya existe un usuario registrado con ese correo");
      }
    });
  };

  return (
    <span>
      <TextInput
        noLayout="false"
        email
        validate
        label="correo electrónico"
        error="Escriba un correo correcto"
        success="¡Vamos a ver!"
        value={emailValue}
        onChange={emailChange}
      />

      <TextInput
        noLayout="false"
        text
        validate
        label="nombre"
        value={userNameValue}
        onChange={userNameChange}
      />

      <TextInput
        noLayout="false"
        password
        validate
        label="contraseña"
        error="Debe tener 4 o más caracteres"
        success="¡Bien hecho!"
        minlength="4"
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
        onClick={regUser}
      />
      <span>
        <strong> ...solo estás a un paso</strong>
      </span>
      <Badge className="red-text">{error}</Badge>
    </span>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users
});
const mapDispatchToProps = {
  regUser: actions.regUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser);
