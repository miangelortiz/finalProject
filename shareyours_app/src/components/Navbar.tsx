import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { Navbar, NavItem } = require("react-materialize");

  return (
    <Navbar
      brand={<a>Logo</a>}
      alignBrand="left"
      alignLinks="right"
      className="teal lighten-2  "
      width={"100vh"}
      fixed
    >
      <NavItem href="">login</NavItem>
      <NavItem href="#register">registrarse</NavItem>
    </Navbar>
  );
};

export default Navbar;
