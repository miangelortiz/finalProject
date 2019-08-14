import React from "react";

const Footer: React.FC = () => {
  const { Footer, Icon } = require("react-materialize");
  return (
    <Footer
      copyrights="© 2019 ShareYours"
      links={<ul />}
      className="white"
    >
      <div className="row">
        <div className="col l6 ">
          <p className="grey-text text-darken-4">
            Made with <Icon tiny>favorite_border</Icon> with react-materialize
          </p>
        </div>
        <div className="col l2 offset-l4 ">
          <ul>
            <li>
              <a className="grey-text text-darken-3" href="#!">
                Link 1
              </a>
            </li>
            <li>
              <a className="grey-text text-darken-3" href="#!">
                Link 2
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Footer>
  );
};

export default Footer;
