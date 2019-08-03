import React from "react";
import jwt from "jsonwebtoken";
import * as actions from "../actions/actions";
import { IMyUser } from "../interfaces/userInterfaces";
import { connect } from "react-redux";

interface IProps {}

interface IPropsGlobal {
  setToken: (token: string) => void;
  setMyUser: (myUser: IMyUser) => void;
}

const Login: React.FC<IProps & IPropsGlobal> = props => {
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
        });
      } else {
        setError("Correo o contraseña incorrecta");
      }
    });
  };

  return (
    <>
      <Row>
        <Col m={4} s={12}>
          <CardPanel className="z-depth-4 card-panel">
            <Row>
              <Col>
                <TextInput
                  email
                  validate
                  label="correo electrónico"
                  icon={<Icon tiny>email</Icon>}
                  error="Escriba un correo correcto"
                  success="¡Bien hecho!"
                  value={emailValue}
                  onChange={emailChange}
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
              <Col>
                <Button
                  className=" deep-purple lighten-2"
                  node="a"
                  waves="light"
                  small
                  style={{ marginRight: "5px" }}
                  onClick={getToken}
                >
                  Entrar
                </Button>
              </Col>
              <Badge className="red-text">{error}</Badge>
            </Row>
          </CardPanel>
        </Col>
      </Row>
    </>
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
