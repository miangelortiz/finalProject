import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div className="row rowFooter">
      <div className="col s4 ">
        <img src="/images/idea.png" className="imgFooter" alt="ShareYours" />
      </div>
      <div className="col s4 ">
        <p className="textFooter2">© 2019 ShareYours</p>
      </div>
      <div className="col s4 textFooter3">
        <ul className="ulFooter">
          <li>
            <a href="https://github.com/miangelortiz">
              <img
                src="/images/GitHub_Logo.png"
                className="socialFooter"
                alt="MyGithub"
              />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/maortizolid">
              <img
                src="/images/linkedin-logo.jpg"
                className="socialFooter"
                alt="MyLinkedIn"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
