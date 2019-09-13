import React from "react";
import { IUser } from "../../interfaces/userInterfaces";
import * as actions from "../../actions/actions";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
const { TextInput, Button, Badge, Select } = require("react-materialize");

interface IPropsGlobal {
  users: IUser[];
  regUser: (user: IUser) => void;
}

const RegisterUser: React.FC<IPropsGlobal> = props => {
  const [emailValue, setEmailValue] = React.useState<string>("");
  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [userNameValue, setUserNameValue] = React.useState<string>("");
  const [avatarValue, setAvatarsValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [msg, setMsg] = React.useState<string>("");

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
    setError("");
    setMsg("");
  };
  const userNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(event.currentTarget.value);
    setError("");
    setMsg("");
  };
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
    setError("");
    setMsg("");
  };

  const avatarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAvatarsValue(event.currentTarget.value);
    setError("");
    setMsg("");
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
          setMsg("¡Has sido registrado! Inicia sesión");
          window.setTimeout(() => {
            const a: any = document.getElementById("login_item")!.firstChild!;
            a.click();
          }, 2000);
        });
      } else {
        setError("Ya existe un usuario con ese nombre o correo");
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
        value={emailValue}
        onChange={emailChange}
      />

      <TextInput
        noLayout
        text
        validate
        label="nombre"
        value={userNameValue}
        onChange={userNameChange}
      />

      <TextInput
        noLayout
        password
        validate
        label="contraseña"
        error="Debe tener 4 o más caracteres"
        minLength="4"
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
        <option defaultValue="" selected disabled>
          Elije tu avatar
        </option>
        <option
          value="avatar-01"
          data-icon="http://localhost:3000/images/avatars/avatar-01.png"
        >
          Enérgico
        </option>
        <option
          value="avatar-02"
          data-icon="http://localhost:3000/images/avatars/avatar-02.png"
        >
          Meditador
        </option>
        <option
          value="avatar-03"
          data-icon="http://localhost:3000/images/avatars/avatar-03.png"
        >
          Productivo
        </option>
        <option
          value="avatar-04"
          data-icon="http://localhost:3000/images/avatars/avatar-04.png"
        >
          Resitente
        </option>
        <option
          value="avatar-05"
          data-icon="http://localhost:3000/images/avatars/avatar-05.png"
        >
          Entusiasta
        </option>
        <option
          value="avatar-06"
          data-icon="http://localhost:3000/images/avatars/avatar-06.png"
        >
          Novedoso
        </option>
        <option
          value="avatar-07"
          data-icon="http://localhost:3000/images/avatars/avatar-07.png"
        >
          Decidido
        </option>
        <option
          value="avatar-08"
          data-icon="http://localhost:3000/images/avatars/avatar-08.png"
        >
          Entregado
        </option>
      </Select>

      <Button
        className="teal lighten-2"
        floating
        node="a"
        waves="light"
        small
        icon="check"
        tooltip="¡Regístrate!"
        tooltipOptions={{ position: "bottom" }}
        onClick={regUser}
      />
      <Badge className="red-text">{error}</Badge>
      <Badge className="teal-text">{msg}</Badge>
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
