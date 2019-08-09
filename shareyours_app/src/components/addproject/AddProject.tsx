import React from "react";
import { IMyUser } from "../../interfaces/userInterfaces";
import * as actions from "../../actions/actions";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { ITag } from "../../interfaces/tagInterface";
import { RouteComponentProps } from "react-router-dom";

const { TextInput, Textarea, Select, Button } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
  tags: ITag[];

  addNewProject: (project: IProject) => void;
}

const AddProject: React.FC<IPropsGlobal & RouteComponentProps<any>> = props => {
  const [titleValue, setTitleValue] = React.useState<string>("");
  const [subTitleValue, setSubTitleValue] = React.useState<string>("");
  const [contentValue, setContentValue] = React.useState<string>("");
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

  const addNewProject = () => {
    const userId = props.myUser.id;
    fetch("http://localhost:3000/api/projects/add", {
      method: "POST",
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
          props.addNewProject(p);
          props.history.push(`/projects/user/${userId}`);
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m5">
          <div className="card-panel ">
            <div className="row">
              <div className="col s12">
                <TextInput
                  noLayout="false"
                  text
                  validate
                  label="Nombre App"
                  value={titleValue}
                  onChange={titleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <TextInput
                  noLayout="false"
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
                  noLayout="false"
                  label="Describe tu proyecto"
                  data-length={300}
                  value={contentValue}
                  onChange={contentChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <Select multiple onChange={tagsChange}>
                  <option value="" disabled>
                    Elige una etiqueta
                  </option>
                  {props.tags.map(t => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </Select>
                <div className="row">
                  <div className="col s12">
                    <Button
                      className="teal lighten-2"
                      floating
                      node="a"
                      waves="light"
                      small
                      icon="check"
                      onClick={addNewProject}
                    />
                    <strong> ...comparte tu proyecto!!</strong>
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
  tags: state.tags
});

const mapDispatchToProps = {
  addNewProject: actions.addNewProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProject);
