import React from "react";



const Navbar: React.FC = () => {
    const { Navbar, NavItem } = require("react-materialize");
  return (
    <Navbar brand={<a />} alignLinks="right">
      <NavItem href="">Getting started</NavItem>
      <NavItem href="components.html">Components</NavItem>
    </Navbar>
  );
};

export default Navbar;
