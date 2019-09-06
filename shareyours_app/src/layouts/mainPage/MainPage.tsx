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
const { Collapsible, CollapsibleItem } = require("react-materialize");

const Main: React.FC<IPropsGlobal> = () => {
  return (
    <div className="container mainCont">
      <div className="row mainRow">
        <div className="col s6 animated  bounceInLeft slow">
          <img src="/images/logo.png" alt="" className="mainImage" />
        </div>
        <div className="col s6">
          <div className="row">
            <div className="col s12 m8 animated  bounceInRight">
              <div className="mainTitle animated  wobble slow">
                ¡No esperes más! <br /> ¡Aporta tu proyecto e ideas!
              </div>
              <Collapsible popout>
                <CollapsibleItem
                  id="login_item"
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
                  <RegisterUser />
                </CollapsibleItem>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
      <div className="row mainRow">
        <div className="col s12">© 2019 ShareYours [ a startup comunity ]</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setToken: actions.setToken
};
export default connect(
  null,
  mapDispatchToProps
)(Main);
