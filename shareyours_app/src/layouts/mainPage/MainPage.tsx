import React from "react";
import RegisterUser from "../../components/register/Register";
import Login from "../../components/login/Login";
import "./MainPage.css";
import { Route } from "react-router-dom";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

interface IPropsGlobal {
  setToken: (token: string) => void;  
}
const { Collapsible, CollapsibleItem, Icon } = require("react-materialize");

const Main: React.FC<IPropsGlobal> = () => {
  return (
    <div className="container mainCont">
      <div className="row mainRow">
        <div className="col s6">
          <img src="/images/logo.png" alt="" className="mainImage" />
        </div>
        <div className="col s6">
          <div className="row">
            <div className="col s12 m8">
              <div className="card-panel teal lighten-3 ">
                <strong>¡No esperes más! ¡Aporta tu proyecto e ideas!</strong>
              </div>
              <Collapsible popout>
                <CollapsibleItem
                  header="Inicia sesión y continua"
                  icon="lock_open"
                  expanded
                >
                  <Route component={Login} />
                </CollapsibleItem>
                <CollapsibleItem
                  header="¿No tienes cuenta? !Vamos allá!"
                  icon="person_outline"
                >
                  <Route component={RegisterUser} />
                </CollapsibleItem>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
      <div className="row footRow">
        <div className="col s12">
          © 2019 ShareYours | Made with <Icon tiny>favorite_border</Icon> with
          react-materialize
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setToken: actions.setToken
};
export default connect(null, mapDispatchToProps)(Main);
