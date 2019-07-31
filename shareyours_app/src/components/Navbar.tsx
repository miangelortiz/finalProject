import React from "react";

const Navbar: React.FC = () => {
  // const { Navbar, NavItem } = require("react-materialize");
  return (
    <nav>
      <ul className="nav-wrapper deep-purple lighten-4">
        <a href="#" className="brand-logo">
          Logo
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="sass.html">login</a>
          </li>
          <li>
            <a href="badges.html">registrarse</a>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default Navbar;
