import React from "react";
import { IUser, IMyUser } from "../../interfaces/userInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { RouteComponentProps } from "react-router";

const { TextInput, Button, Select, Modal } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
  users: IUser[];
  editUser: (user_id: string, user: IUser) => void;
  Reset: () => void;
}

const MyUser: React.FC<
  IPropsGlobal & RouteComponentProps<{ userId: string }>
> = props => {
  const userLog = props.users.find(u => u._id === props.myUser.id);

  const [userNameValue, setNameValue] = React.useState<string>(
    userLog ? userLog.name : ""
  );
  const [emailValue, setEmailValue] = React.useState<string>(
    userLog ? userLog.email : ""
  );
  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [avatarValue, setAvatarsValue] = React.useState<string>(
    userLog ? userLog.avatar : ""
  );
  // const [error, setError] = React.useState<string>("");

  if (!userLog) {
    return null;
  }

  const userNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.currentTarget.value);
  };
  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
  };
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
  };
  const avatarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAvatarsValue(event.currentTarget.value);
  };

  //UPDATE USER
  const updateUser = (user_id: string, user: IUser) => {
    const id = user._id;
    fetch("http://localhost:3000/api/user/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        name: userNameValue,
        email: emailValue,
        password: passwordValue,
        avatar: avatarValue
      })
    }).then(resp => {
      if (resp.ok) {
        resp.json().then((u: IUser) => {
          props.history.push(`/user/${id}`);
          props.editUser(user_id, u);
        });
      }
    });
  };

  //DELETE USER (and user proyects/ideas)
  const deleteUser = (user_id: string) => {
    fetch("http://localhost:3000/api/user/" + user_id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(resp => {
      if (resp.ok) {
        props.Reset();
        localStorage.removeItem("token");
        props.history.push("/");
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s4 offset-s4 ">
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <img
                src={
                  "http://localhost:3000/images/avatars/" +
                  userLog.avatar +
                  ".png"
                }
                className="activator"
                alt="user"
              />
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                {userLog.name}
                <i className="material-icons right">more_vert</i>
              </span>
              <p>{userLog.email}</p>
              <p>Edita y cambia tu perfil de usuario</p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">
                ¿Qué quieres cambiar?
                <i className="material-icons right">close</i>
              </span>

              <span>
                <TextInput
                  noLayout
                  email
                  validate
                  label="correo electrónico"
                  error="Escriba un correo correcto"
                  success="¡Vamos a ver!"
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
                  success="¡Bien hecho!"
                  minLength="4"
                  value={passwordValue}
                  onChange={passwordChange}
                />

                <Select
                  className="icons"
                  onChange={avatarChange}
                  noLayout
                  options={{ dropDownOptions: { closeOnClick: false } }}
                >
                  <option
                    value={userLog.avatar}
                    data-icon={
                      "http://localhost:3000/images/avatars/" +
                      userLog.avatar +
                      ".png"
                    }
                    disabled
                    selected
                  >
                    Tu avatar...
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

                <div className="row myUserC">
                  <div className="col s6">
                    <Button
                      className="teal lighten-2"
                      floating
                      node="a"
                      waves="light"
                      icon="edit"
                      tooltip="Cambiemos tu perfil"
                      tooltipoptions={{ position: "bottom" }}
                      onClick={() => updateUser(userLog._id, userLog)}
                    />
                  </div>
                  <div className="col s6">
                    <Modal
                      header="Vas a eliminar tu cuenta, se eliminarán también todos tus proyectos e ideas aportadas a otros usuarios."
                      className="modalShow"
                      options={{ dismissible: false }}
                      trigger={
                        <Button
                          className="teal lighten-2"
                          floating
                          node="a"
                          waves="light"
                          icon="delete_forever"
                          tooltip="Elimina tu cuenta"
                          tooltipoptions={{ position: "bottom" }}
                        />
                      }
                    >
                      <span>
                        <Button
                          className="red"
                          onClick={() => deleteUser(userLog._id)}
                        >
                          ¿Estás seguro?
                        </Button>{" "}
                      </span>
                    </Modal>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  myUser: state.myUser,
  users: state.users
});
const mapDispatchToProps = {
  editUser: actions.editUser,
  Reset: actions.Reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyUser);
