import React from "react";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IBsIdea, IBrain } from "../../interfaces/brainInterface";
import { IGlobalState } from "../../reducers/reducers";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";

const { TextInput, Button } = require("react-materialize");

interface IProps {
  brainId: string;
}

interface IPropsGlobal {
  myUser: IMyUser;
  token: string;
  brainTitle: IBrain[];
  addBsIdea: (bsIdea: IBsIdea) => void;
}

const AddBsIdea: React.FC<IProps & IPropsGlobal> = props => {
  const brainId = props.brainId;

  const [contentValue, setContentValue] = React.useState<string>("");
  const contentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentValue(event.currentTarget.value);
  };

  //Add idea for brainstorming
  const addBsIdea = () => {
    fetch("http://localhost:3000/api/brainstorming/add/idea/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        content: contentValue,
        brain: brainId
      })
    }).then(resp => {
      if (resp.ok) {
        resp.json().then((i: IBsIdea) => {
          props.addBsIdea(i);
        });
      }
    });
  };

  return (
    <div className="card-panel ">
      <div className="row">
        <div className="col s12">
          <TextInput
            noLayout
            text
            validate
            label="Aporta tu idea (máx. 60 caracteres) "
            data-length={60}
            maxLength="60"
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
            onClick={addBsIdea}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  token: state.token,
  brainTitle: state.brainTitle
});

const mapDispatchToProps = {
  addBsIdea: actions.addBsIdea
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBsIdea);
