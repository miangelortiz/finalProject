import React from "react";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IIdea } from "../../interfaces/ideaInterface";
import { IGlobalState } from "../../reducers/reducers";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

const { Textarea, Button } = require("react-materialize");

interface IPropsGlobal {
  myUser: IMyUser;
  token: string;
  ideas: IIdea[];
  addNewIdea: (idea: IIdea) => void;
}

const AddIdea: React.FC<
  IPropsGlobal & RouteComponentProps<{ projectId: string }>
> = props => {
  const projectId = props.match.params.projectId;

  const [contentValue, setContentValue] = React.useState<string>("");
  const contentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentValue(event.currentTarget.value);
  };

  const addIdea = () => {
    fetch("http://localhost:3000/api/ideas/add/" + projectId, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        content: contentValue
      })
    }).then(resp => {
      if (resp.ok) {
        resp.json().then((i: IIdea) => {
          props.addNewIdea(i);
          props.history.push(`/projects/${projectId}`);
        });
      }
    });
  };

  return (
    <div className="card-panel ">
      <div className="row">
        <div className="col s12">
          <Textarea
            noLayout="false"
            label="Aporta tu idea al proyecto"
            data-length={500}
            value={contentValue}
            onChange={contentChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <Button
            className="teal lighten-2"
            tooltip="Añade tu idea"
            tooltipOptions={{ position: "right" }}
            floating
            node="a"
            waves="light"
            small
            icon="check"
            onClick={addIdea}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  token: state.token
});

const mapDispatchToProps = {
  addNewIdea: actions.addNewIdea
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIdea);
