import React from "react";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import { Switch, Route, Redirect } from "react-router";

const LayoutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Main />
      {/* <Switch>
        <Route path="/login" exact component={Main}></Route>
        <Redirect to="/"></Redirect>
      </Switch> */}
    </>
  );
};

export default LayoutPage;
