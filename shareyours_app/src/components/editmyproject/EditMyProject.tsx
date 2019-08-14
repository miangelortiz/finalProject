import React from "react";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { ITag } from "../../interfaces/tagInterface";
import * as actions from "../../actions/actions";

const { TextInput, Textarea, Select, Button } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
  tags: ITag[];
  projects: IProject[];

  editProject: (project_id: string, project: IProject) => void;
  removeProject: (project_id: string) => void;
  removeIdea: (project_id: string) => void;
}

const EditMyProject: React.FC<
  IPropsGlobal & RouteComponentProps<{ projectId: string }>
> = props => {
  const project = props.projects.find(
    p => p._id === props.match.params.projectId
  );

  const [titleValue, setTitleValue] = React.useState<string>(
    project ? project.title : ""
  );
  const [subTitleValue, setSubTitleValue] = React.useState<string>(
    project ? project.subtitle : ""
  );
  const [contentValue, setContentValue] = React.useState<string>(
    project ? project.content : ""
  );
  const [tags, setTagsValue] = React.useState<string[]>([]);

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.currentTarget.value);
  };
  const subTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTitleValue(event.currentTarget.value);
  };
  const contentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentValue(event.currentTarget.value);
  };
  const tagsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.currentTarget.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setTagsValue(selectedOptions);
  };

  //UPDATE PROJECT
  const updateMyProject = (project_id: string, project: IProject) => {
    const id = project._id;
    fetch("http://localhost:3000/api/projects/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        title: titleValue,
        subtitle: subTitleValue,
        content: contentValue,
        tags: tags
      })
    }).then(resp => {
      if (resp.ok) {
        resp.json().then((p: IProject) => {
          props.editProject(project_id, p);
          props.history.push(`/projects/user/${props.myUser.id}`);
        });
      }
    });
  };

  // REMOVE PROJECT
  const deleteProject = (project_id: string) => {
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
        props.history.push(`/projects/user/${props.myUser.id}`);
      }
    });
  };

  if (!project) {
    return null;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m5">
          <div className="card-panel ">
            <div className="row">
              <div className="col s12">
                <TextInput
                  noLayout
                  text
                  validate
                  label="Nombre de mi proyecto"
                  value={titleValue}
                  onChange={titleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <TextInput
                  noLayout
                  text
                  validate
                  label="Breve descripcion"
                  value={subTitleValue}
                  onChange={subTitleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <Textarea
                  noLayout
                  label="Contenido de mi proyecto"
                  data-length={1000}
                  value={contentValue}
                  onChange={contentChange}
                />
              </div>
            </div>
            {/* <div className="row">
              <div className="col s6">
                <span>A {project.} les gusta mi proyecto</span>
              </div>
            </div> */}
            <div className="row">
              <div className="col s12">
                <Select
                  multiple
                  onChange={tagsChange}
                  noLayout="false"
                  options={{ dropDownOptions: { closeOnClick: false } }}
                  value={project.tags.map(t => t._id)}
                >
                  {props.tags.map(t => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </Select>
                <div className="row">
                  <div className="col s6">
                    <Button
                      className="teal lighten-2"
                      floating
                      node="a"
                      waves="light"
                      large
                      icon="edit"
                      onClick={() => updateMyProject(project._id, project)}
                    />
                  </div>
                  <div className="col s6">
                    <Button
                      className="teal lighten-2"
                      floating
                      node="a"
                      waves="light"
                      large
                      icon="delete_forever"
                      tooltip="Se eliminarán también las ideas aportadas a tu proyecto"
                      tooltipOptions={{ position: "bottom" }}
                      onClick={() => deleteProject(project._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  myUser: state.myUser,
  tags: state.tags,
  projects: state.projects
});

const mapDispatchToProps = {
  editProject: actions.editProject,
  removeProject: actions.removeProject,
  removeIdea: actions.removeIdea
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMyProject);
