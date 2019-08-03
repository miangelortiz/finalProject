import React from "react";

//Import Materialize-css
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

//
import LayoutPage from "./layouts/LayoutPage";
import { BrowserRouter } from "react-router-dom";
import { IGlobalState } from "./reducers/reducers";
import { connect } from "react-redux";

interface IPropsGlobal {
  token: string;
}

const App: React.FC<IPropsGlobal> = props => {
  return (
    <div>
      <BrowserRouter>{!props.token && <LayoutPage />}</BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});

export default connect(mapStateToProps)(App);
