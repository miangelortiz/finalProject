import React from "react";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/actions";

const { Collapsible, CollapsibleItem, Button } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  projects: IProject[];
  removeProject: (project_id: string) => void;
  removeIdea: (project_id: string) => void;
}

const ProjectsAdmin: React.FC<IPropsGlobal> = props => {
  const delProject = (project_id: string) => {
    fetch("http://localhost:3000/api/projects/" + project_id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(resp => {
      if (resp.ok) {
        props.removeProject(project_id);
        props.removeIdea(project_id);
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row adminTitle">
          [ lista de proyectos ] [ {props.projects.length} ]
        </div>

        <div className="row">
          <div className="col s4 offset-s4">
            <Collapsible>
              {props.projects
                .sort((p1, p2) =>
                  p1.title < p2.title ? -1 : +(p1.title > p2.title)
                )
                .map(p => (
                  <CollapsibleItem header={p.title}>
                    <p>
                      <span className="showAdmin">ID: </span>
                      <Link to={"/projects/" + p._id}>
                        <span className="showDuser"> {p._id} </span>
                      </Link>
                    </p>
                    <p>
                      <span className="showAdmin">Proyecto de: </span>
                      {p.user.name} ({p.user._id})
                    </p>

                    <p>
                      <span className="showAdmin">Creado el: </span>
                      {new Date(p.created).toLocaleDateString()}
                      <span className="showAdmin"> a las </span>
                      {new Date(p.created).toLocaleTimeString()}
                    </p>
                    <p>
                      <Button
                        className="transparent"
                        flat
                        small
                        waves="light"
                        icon="clear"
                        onClick={() => delProject(p._id)}
                      >
                        <span className="showAdmin">eliminar proyecto</span>
                      </Button>
                    </p>
                  </CollapsibleItem>
                ))}
            </Collapsible>
          </div>
        </div>
        <div className="row adminTitle">
          <Link to={"/admin"}>
            <span className="showDuser"> panel de administrador </span>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  projects: state.projects
});
const mapDispatchToProps = {
  removeProject: actions.removeProject,
  removeIdea: actions.removeIdea
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsAdmin);
