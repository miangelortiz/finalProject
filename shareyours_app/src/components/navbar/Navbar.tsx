import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { IMyUser, IUser } from "../../interfaces/userInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";

const {
  Navbar,
  NavItem,
  Dropdown,
  Divider,
  Chip
} = require("react-materialize");

interface IPropsGlobal {
  myUser: IMyUser;
  users: IUser[];
  setToken: (token: string) => void;  
}

const MyNavbar: React.FC<IPropsGlobal> = props => {
  const userLog= props.users.find(u=>u._id===props.myUser.id);

  const logOut = () => {
    localStorage.removeItem("token");
    props.setToken("");
  };

  if(!userLog){
    return null
  }

  return (
    <Navbar
      brand={<img className="logoImg" src="/images/logo.png" alt="logo" />}
      alignBrand="left"
      alignLinks="right"
      className="navBar"
    >
      <NavItem>
        <Link to={"/projects/"} className="navLink">
          proyectos
        </Link>
      </NavItem>

      <NavItem className="navLink">
        <Dropdown
          className="userBut "
          trigger={
            <Chip>
              <img
                src={"http://localhost:3000/images/avatars/"+userLog.avatar +".png"}
                className="responsive-img"
                alt="user"
              />
              {props.myUser.name}
            </Chip>
        
          }
        >
          <a href="">mi perfil</a>
          <Divider />
          <Link to={"/projects/user/" + props.myUser.id}> mis proyectos</Link>
          <Divider />
          <Link to={"/projects/add/"}>¡crea un proyecto!</Link>
          <Divider />
          <a onClick={logOut}>cerrar sesión</a>
        </Dropdown>
      </NavItem>
    </Navbar>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  users: state.users
});

const mapDispatchToProps = {
  setToken: actions.setToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNavbar);
