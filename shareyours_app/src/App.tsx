import React, { useEffect } from "react";

//Import Materialize-css
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
//
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { IGlobalState } from "./reducers/reducers";
import { connect } from "react-redux";
import Main from "./layouts/mainPage/MainPage";
import LayoutPage from "./layouts/layoutPage/LayoutPage";
import * as actions from "./actions/actions";
import jwt from "jsonwebtoken";
import { IMyUser } from "./interfaces/userInterfaces";

interface IPropsGlobal {
  token: string;
  setToken: (token: string) => void;
  setMyUser: (myUser: IMyUser) => void;
}

const App: React.FC<IPropsGlobal> = props => {
  const tokenVerify = () => {
    const token = localStorage.getItem("token");
    if (token) {
      props.setToken(token);
      const decoded = jwt.decode(token);
      if (decoded !== null && typeof decoded !== "string") {
        props.setMyUser(decoded);
      }
    }
  };

  useEffect(tokenVerify, []);

  return (
    <BrowserRouter>
      <Switch>
        {!props.token && <Route path="/" exact component={Main} />}
        {props.token && <Route component={LayoutPage} />}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});

const mapDispatchToProps = {
  setToken: actions.setToken,
  setMyUser: actions.setMyUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
