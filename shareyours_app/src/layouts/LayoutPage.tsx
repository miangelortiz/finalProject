import React from "react";
import Navbar from "../components/Navbar";

const LayoutPage: React.FC = () => {
  return (
    <div className="row">
      <div className="col s12">
          <Navbar></Navbar>
      </div>
    </div>
  );
};

export default LayoutPage;
