import React from "react";
import "./AddProject.css";
import { IMyUser } from "../../interfaces/userInterfaces";
import * as actions from "../../actions/actions";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { ITag } from "../../interfaces/tagInterface";
import { RouteComponentProps } from "react-router-dom";

const {
  TextInput,
  Textarea,
  Select,
  Button,
  Icon,
  Badge
} = require("react-materialize");

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
  const [error, setError] = React.useState<string>("");

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.currentTarget.value);
    setError("");
  };
  const subTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTitleValue(event.currentTarget.value);
    setError("");
  };
  const contentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentValue(event.currentTarget.value);
    setError("");
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

  //Add new project by the logged user
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
      } else {
        setError("Debe rellenar todos los campos");
      }
    });
  };

  return (
    <div className="container">
      <div className="row addTitle ">
        <div className="col s12 m5 offset-m2">
          <Icon small>add</Icon> [ crea un proyecto ]
        </div>
      </div>
      <div className="row ">
        <div className="col s12 m5 offset-m3 ">
          <div className="card-panel ">
            <div className="row">
              <div className="col s12">
                <TextInput
                  noLayout
                  text
                  validate
                  maxLength="30"
                  data-length={30}
                  label="Nombre App (max. 30 caracteres)"
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
                  maxLength="80"
                  data-length={80}
                  label="Breve descripcion (máx. 80 caracteres)"
                  value={subTitleValue}
                  onChange={subTitleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <Textarea
                  noLayout
                  label="Describe tu proyecto (máx. 1000 caracteres)"
                  data-length={1000}
                  maxLength="1000"
                  value={contentValue}
                  onChange={contentChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12 createSelect">
                <Select
                  multiple
                  onChange={tagsChange}
                  noLayout
                  options={{ dropDownOptions: { closeOnClick: false } }}
                >
                  <option value="" disabled>
                    Elige una categoria para tu proyecto
                  </option>
                  {props.tags.sort().map(t => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </Select>
                <div className="row validateB">
                  <div className="col s2">
                    <Button
                      className="teal lighten-2"
                      floating
                      waves="light"
                      small
                      icon="check"
                      onClick={addNewProject}
                    />
                  </div>
                  <div className="col s10 validateP">
                    <span> ...comparte tu proyecto!!</span>
                  </div>
                  <Badge className="red-text">{error}</Badge>
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
