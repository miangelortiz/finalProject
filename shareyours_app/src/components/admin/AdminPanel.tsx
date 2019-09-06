import React from "react";
import "./AdminPanel.css";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const {
  Collapsible,
  CollapsibleItem,
  TextInput,
  Button,
  Badge
} = require("react-materialize");

interface IPropsglobal {
  myUser: IMyUser;
  token: string;
}

const AdminPanel: React.FC<IPropsglobal> = props => {
  const [titleValue, setTitleValue] = React.useState<string>("");
  const [msg, setMsg] = React.useState<string>("");
  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.currentTarget.value);
    setMsg("");
  };

  //Add weekly brainstorming
  const addBrainProject = () => {
    fetch("http://localhost:3000/api/brainstorming/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        title: titleValue
      })
    }).then(res => {
      if (res.ok) {
        setMsg("Proyecto añadido");
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row  adminTitle ">[ panel del administrador ]</div>
        <div className="row">
          <div className="col s4 offset-s4">
            <Collapsible>
              <CollapsibleItem header="USUARIOS" icon="person">
                <Link to={"/admin/users"}>
                  <span className="showDuser"> Control de usuarios </span>
                </Link>
              </CollapsibleItem>
              <CollapsibleItem header="PROYECTOS" icon="assignment">
                <Link to={"/admin/projects"}>
                  <span className="showDuser">
                    {" "}
                    Control de proyectos de usuarios{" "}
                  </span>
                </Link>
              </CollapsibleItem>
              <CollapsibleItem header="IDEAS" icon="lightbulb">
                <Link to={"/admin/ideas"}>
                  <span className="showDuser">
                    {" "}
                    Control de ideas aportadas por los usuarios{" "}
                  </span>
                </Link>
              </CollapsibleItem>
              <CollapsibleItem header="CATEGORÍAS" icon="label">
                <Link to={"/admin/tags"}>
                  <span className="showDuser">
                    {" "}
                    Añade o elimina categorías{" "}
                  </span>
                </Link>
              </CollapsibleItem>
              <CollapsibleItem header="BRAINSTORMING" icon="event">
                <Collapsible>
                  <CollapsibleItem header="proyectos anteriores">
                    Brainstorming anteriores....in progress
                  </CollapsibleItem>
                  <CollapsibleItem header="proyecto de la semana">
                    <div className="row">
                      <div className="col s12">
                        <TextInput
                          noLayout
                          text
                          validate
                          label="Nombre del proyecto de la semana"
                          value={titleValue}
                          onChange={titleChange}
                        />
                      </div>
                    </div>
                    <div className="row validateB">
                      <div className="col s2">
                        <Button
                          className="teal lighten-2"
                          floating
                          waves="light"
                          small
                          icon="check"
                          onClick={addBrainProject}
                        />
                      </div>
                      <Badge className="teal-text">{msg}</Badge>
                    </div>
                  </CollapsibleItem>
                </Collapsible>
              </CollapsibleItem>
            </Collapsible>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  token: state.token
});
export default connect(mapStateToProps)(AdminPanel);
