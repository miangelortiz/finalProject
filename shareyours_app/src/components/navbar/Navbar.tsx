import React from "react";
import "./Navbar.css";
import { Link, RouteComponentProps, Route } from "react-router-dom";
import { IMyUser, IUser } from "../../interfaces/userInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { IProject } from "../../interfaces/projectInterfaces";
import Notifications from "../notifications/Notifications";

const {
  Navbar,
  Dropdown,
  Divider,
  Chip,
  Button,
  Modal
} = require("react-materialize");

interface IPropsGlobal {
  myUser: IMyUser;
  users: IUser[];
  projects: IProject[];
  Reset: () => void;
}

const MyNavbar: React.FC<IPropsGlobal & RouteComponentProps> = props => {
  const userLog = props.users.find(u => u._id === props.myUser.id);

  const logOut = () => {
    props.Reset();
    localStorage.removeItem("token");
  };

  if (!userLog) {
    return null;
  }
  return (
    <Navbar
      brand={<img className="logoImg" src="/images/logo2.png" alt="logo" />}
      alignBrand="left"
      alignLinks="right"
      className="navBar"
      fixed
    >
      {props.myUser.isAdmin && (
        <Button
          flat
          waves="light"
          className="navLink"
          onClick={() => props.history.push("/admin")}
        >
          [ ADMIN ]
        </Button>
      )}
      <Button
        flat
        waves="light"
        className="navLink"
        onClick={() => props.history.push("/brainstorming")}
      >
        #brainstorming
      </Button>
      <Button
        flat
        waves="light"
        className="navLink"
        onClick={() => props.history.push("/topProjects")}
      >
        #mas valorados
      </Button>
      <Button
        flat
        waves="light"
        className="navLink"
        onClick={() => props.history.push("/projects")}
      >
        #proyectos
      </Button>

      <>
        <Dropdown
          trigger={
            <Chip className="userBut ">
              <img
                src={
                  "http://localhost:3000/images/avatars/" +
                  userLog.avatar +
                  ".png"
                }
                className="responsive-img"
                alt="user"
              />
              {userLog.name}
            </Chip>
          }
        >
          <Link to={"/user/" + props.myUser.id}> mi perfil</Link>
          <Divider />
          <Link to={"/projects/add/"}>¡crea un proyecto!</Link>
          <Divider />
          <Link to={"/projects/user/" + props.myUser.id}> mis proyectos</Link>
          <Divider />
          <Modal
            header="[ mis votos ]"
            className="modalNav"
            options={{ dismissible: false }}
            trigger={<Link to={"/user/votes/" + props.myUser.id}> votos</Link>}
          >
            <div>
              <Route component={Notifications} />
            </div>
          </Modal>
          <Divider />
          <a onClick={logOut}>cerrar sesión</a>
        </Dropdown>
      </>
    </Navbar>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  users: state.users,
  projects: state.projects
});

const mapDispatchToProps = {
  Reset: actions.Reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNavbar);
