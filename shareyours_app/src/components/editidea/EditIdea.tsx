import React from "react";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IIdea } from "../../interfaces/ideaInterface";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { RouteComponentProps } from "react-router-dom";

const { Textarea, Button } = require("react-materialize");

interface IPropsGlobal {
  myUser: IMyUser;
  token: string;
  ideas: IIdea[];
  editIdea: (idea_id: string, idea: IIdea) => void;
}

const EditIdea: React.FC<
  IPropsGlobal & RouteComponentProps<{ ideaID: string }>
> = props => {
const ideaID=props.match.params.ideaID
  const myidea = props.ideas.find(i => i._id === ideaID);
  console.log(myidea)
 

  const [contentValue, setContentValue] = React.useState<string>(
    myidea ? myidea.content : ""
  );
  const contentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentValue(event.currentTarget.value);
  };

 

  //UDATE IDEA
  const updateIdea = (idea_id: string, idea: IIdea) => {
    fetch("http://localhost:3000/api/idea/edit/" + idea._id, {
      method: "PUT",
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
          props.history.push(`/projects/${i.project._id}`);
          props.editIdea(idea_id, i); 
        });
      }
    });
  };

  if (!myidea) {
    return null;
  }

  return (
    <div className="card-panel ">
      <div className="row">
        <div className="col s12">
          <Textarea
            noLayout
            data-length={500}
            maxlength="500"
            value={contentValue}
            onChange={contentChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <Button
            className="teal lighten-2"
            tooltip="Actualizar"
            tooltipoptions={{ position: "right" }}
            floating
            waves="light"
            small
            icon="edit"
            onClick={() => updateIdea(myidea._id, myidea)}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  token: state.token,
  ideas: state.ideas
});

const mapDispatchToProps = {
  editIdea: actions.editIdea
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditIdea);
