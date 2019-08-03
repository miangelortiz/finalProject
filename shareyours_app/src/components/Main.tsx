import React from "react";
// import Login from "./Login";
import Footer from "./Footer";
import RegisterUser from "./Register";

const Main: React.FC = () => {
  const { Parallax, Row, Col } = require("react-materialize");
  return (
    <div>
      <Parallax image={<img src="images/main1.png" alt="" />} />
      <div className="section white">
        <div className="row container">
          <h2 className="header">welcome</h2>
          <p className="grey-text text-darken-3 lighten-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
            praesentium quisquam fugit suscipit libero harum minima quia aut sed
            modi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
            pariatur! Deleniti cupiditate, facilis pariatur explicabo
            perspiciatis ipsum incidunt tempora labore eligendi adipisci ea
            iusto quia! Magni commodi excepturi voluptatum blanditiis?
          </p>
        </div>
      </div>
      <Parallax image={<img src="images/main2.jpg" alt="" />} />
      <div className="section white" id="register">
        <div className="row container">
          <h3 className="header">Regístrate blablabla</h3>
          <p className="grey-text text-darken-3 lighten-3">
            <RegisterUser />
          </p>
        </div>
      </div>
      <Parallax image={<img src="images/main1.png" alt="" />} />
      <Footer />
    </div>
  );
};

export default Main;
