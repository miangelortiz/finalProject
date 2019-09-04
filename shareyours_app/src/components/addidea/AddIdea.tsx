import React from "react";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IIdea } from "../../interfaces/ideaInterface";
import { IGlobalState } from "../../reducers/reducers";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

const { Textarea, Button } = require("react-materialize");

interface IProps {
  projectId: string;
}
interface IPropsGlobal {
  myUser: IMyUser;
  token: string;
  addNewIdea: (idea: IIdea) => void;
}

const AddIdea: React.FC<IProps & IPropsGlobal> = props => {
  const projectId = props.projectId;

  const [contentValue, setContentValue] = React.useState<string>("");
  const contentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentValue(event.currentTarget.value);
  };

  //ADD Idea by log user
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
        });
      }
    });
  };

  return (
    <div className="card-panel ">
      <div className="row">
        <div className="col s12">
          <Textarea
            noLayout
            label="Aporta tu idea al proyecto (máx. 500 caracteres)"
            data-length={500}
            maxLength="500"
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
            waves="light"
            small
            icon="check"
            onClick={() => {
              setTimeout(() => {
                const a: any = document.getElementsByClassName(
                  "modal-close"
                )[0];
                a.click();
              }, 10);
              addIdea();
            }}
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
