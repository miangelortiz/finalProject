import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";

const {
  Navbar,
  NavItem,
  Dropdown,
  Divider,
  Button
} = require("react-materialize");

interface IPropsGlobal {
  myUser: IMyUser;
  setToken: (token: string) => void;
}

const MyNavbar: React.FC<IPropsGlobal> = props => {
  const logOut = () => {
    localStorage.removeItem("token");
    props.setToken("");
  };

  return (
    <Navbar
      brand={<img className="logoImg" src="/images/logo.png" alt="logo" />}
      alignBrand="left"
      alignLinks="right"
      className="navBar"
    >
      <NavItem className="black-text text-darken-2 ">
        <Dropdown
          className="userBut "
          trigger={
            <Button
              className="teal lighten-2 "
              floating
              node="a"
              waves="light"
              small
              icon="person"
            />
          }
        >
          <a href="#">mi perfil</a>
          <Divider />
          <Link to={"/projects/user/" + props.myUser.id}> mis proyectos</Link>
          <Divider />
          <Link to={"/projects/add/"}>¡crea un proyecto!</Link>
          <Divider />
          <a onClick={logOut}>cerrar sesión</a>
        </Dropdown>
        <strong>{props.myUser.name}</strong>
      </NavItem>
    </Navbar>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser
});

const mapDispatchToProps = {
  setToken: actions.setToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNavbar);
