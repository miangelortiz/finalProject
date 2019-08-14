import React from "react";
import { IUser } from "../../interfaces/userInterfaces";
import * as actions from "../../actions/actions";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
const { TextInput, Button, Badge, Select } = require("react-materialize");

interface IPropsGlobal {
  users: IUser[];
  regUser: (user: IUser) => void;
}

const RegisterUser: React.FC<IPropsGlobal & RouteComponentProps> = props => {
  const [emailValue, setEmailValue] = React.useState<string>("");
  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [userNameValue, setUserNameValue] = React.useState<string>("");
  const [avatarValue, setAvatarsValue] = React.useState<string>("");
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

  const avatarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAvatarsValue(event.currentTarget.value);
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
        password: passwordValue,
        avatar: avatarValue
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

      <Select
      browserDefault
        className="icons"
        onChange={avatarChange}
        noLayout
        options={{ dropDownOptions: { closeOnClick: false } }}
      >
        <option value="" disabled selected>
          Elije tu avatar
        </option>
        <option
          value="avatar-01"
          data-icon="http://localhost:3000/images/avatars/avatar-01.png"
        >example 1</option>
        <option
          value="avatar-02"
          data-icon="http://localhost:3000/images/avatars/avatar-02.png"
        >example 2</option>
        <option
          value="avatar-03"
          data-icon="http://localhost:3000/images/avatars/avatar-03.png"
        >example 3</option>
        <option
          value="avatar-04"
          data-icon="http://localhost:3000/images/avatars/avatar-04.png"
        >example 4</option>
        <option
          value="avatar-05"
          data-icon="http://localhost:3000/images/avatars/avatar-05.png"
        >example 5</option>
        <option
          value="avatar-06"
          data-icon="http://localhost:3000/images/avatars/avatar-06.png"
        >example 6</option>
      </Select>

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
