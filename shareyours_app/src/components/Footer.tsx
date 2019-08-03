import React from "react";

const Footer: React.FC = () => {
  const { Footer } = require("react-materialize");
  return (
    <div>
      <Footer
        copyrights="© 2019 Copyright Text"
        // moreLinks={"by tal y cual"}
        links={<ul />}
        className=" teal darken-1"
      >
        <div className="row">
          <div className="col l6 ">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">
              You can use rows and columns here to organize your footer content.
            </p>
          </div>
          <div className="col l2 offset-l4 ">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 1
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 2
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 3
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 4
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default Footer;
