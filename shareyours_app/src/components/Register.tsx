import React, { useEffect } from "react";
import { IUser } from "../interfaces/userInterfaces";
import * as actions from "../actions/actions";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import Login from "./Login";

interface IPropsGlobal {
  users: IUser[];
  regUser: (user: IUser) => void;
}

const RegisterUser: React.FC<IPropsGlobal> = props => {
  const {
    Row,
    Col,
    TextInput,
    Button,
    Icon,
    CardPanel,
    Badge
  } = require("react-materialize");

  const [emailValue, setEmailValue] = React.useState<string>("");
  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [userNameValue, setUserNameValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
  };
  const userNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(event.currentTarget.value);
    setError("");
  };
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
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
        });
      } else {
        setError("Ya existe un usuario registrado con ese correo");
      }
    });
  };

 

  return (
    <Row>
      <Col m={5} s={12}>
        <CardPanel className="z-depth-4 card-panel">
          <Row>
            <Col>
              <TextInput
                email
                validate
                label="correo electrónico"
                icon={<Icon tiny>email</Icon>}
                error="Escriba un correo correcto"
                success="¡Vamos a ver!"
                value={emailValue}
                onChange={emailChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                text
                validate
                label="nombre"
                icon={<Icon tiny>account_circle</Icon>}
                value={userNameValue}
                onChange={userNameChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                password
                validate
                label="contraseña"
                icon={<Icon tiny>lock</Icon>}
                error="Debe tener 4 o más caracteres"
                success="¡Bien hecho!"
                minlength="4"
                value={passwordValue}
                onChange={passwordChange}
              />
            </Col>
          </Row>
          <Row>
            <Col s={4}>
              <Button
                className=" deep-purple lighten-2"
                node="a"
                waves="light"
                small
                style={{ marginRight: "5px" }}
                onClick={regUser}
              >
                ¡Regístrate!
              </Button>
            </Col>
            <Row>
              <Col>
                <Button flat waves="light" >
                  Log In
                </Button>

                <Badge className="red-text">{error}</Badge>
              </Col>
            </Row>
          </Row>
        </CardPanel>
      </Col>
    </Row>
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
