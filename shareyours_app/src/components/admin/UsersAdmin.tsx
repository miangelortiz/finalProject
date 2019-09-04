import React from "react";
import { IUser, IMyUser } from "../../interfaces/userInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { Link } from "react-router-dom";

const {
  Collapsible,
  CollapsibleItem,
  Button,
  Icon
} = require("react-materialize");

interface IPropsGlobal {
  myUser: IMyUser;
  users: IUser[];
  token: string;
  removeUser: (user_id: string) => void;
}

const UsersAdmin: React.FC<IPropsGlobal> = props => {
  const delUser = (user_id: string) => {
    fetch("http://localhost:3000/api/user/" + user_id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(resp => {
      if (resp.ok) {
        props.removeUser(user_id);
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row adminTitle">
          [ lista de usuarios ] [ {props.users.length - 1} ]
        </div>
        <div className="row">
          <div className="col s4 offset-s4">
            <Collapsible>
              {props.users
                .filter(user => user._id !== props.myUser.id)
                .sort((u1, u2) =>
                  u1.name < u2.name ? -1 : +(u1.name > u2.name)
                )
                .map(u => (
                  <CollapsibleItem key={u._id} header={u.name}>
                    <div className="row">
                      <div className="col s3">
                        <p>
                          <img
                            src={
                              "http://localhost:3000/images/avatars/" +
                              u.avatar +
                              ".png"
                            }
                            className="imgPlist"
                            alt="user"
                          />
                        </p>
                      </div>
                      <div className="col s9 panelShowUser">
                        <p>
                          <span className="showAdmin">ID: </span>
                          {u._id}
                        </p>
                        <p>
                          <span className="showAdmin">CORREO: </span>
                          {u.email}
                        </p>
                        <p>
                          <Link to={"/projects/user/all/" + u._id}>
                            <span className="showDuser">
                              {" "}
                              proyectos publicados{" "}
                            </span>
                          </Link>
                        </p>
                        <p>
                          <Button
                            className="transparent"
                            flat
                            small
                            waves="light"
                            icon="clear"
                            onClick={() => delUser(u._id)}
                          >
                            <span className="showAdmin">
                              {" "}
                              eliminar usuario{" "}
                            </span>
                          </Button>
                        </p>
                      </div>
                    </div>
                  </CollapsibleItem>
                ))}
            </Collapsible>
          </div>
        </div>
        <div className="row adminTitle">
          <Link to={"/admin"}>
            <span className="showDuser"> panel de administrador </span>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  users: state.users,
  token: state.token
});

const mapDispatchToProps = {
  removeUser: actions.removeUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersAdmin);
