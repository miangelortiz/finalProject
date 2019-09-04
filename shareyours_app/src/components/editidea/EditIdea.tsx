import React from "react";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IIdea } from "../../interfaces/ideaInterface";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";

const { Textarea, Button } = require("react-materialize");

interface IProps {
  ideaId: string;
}

interface IPropsGlobal {
  myUser: IMyUser;
  token: string;
  ideas: IIdea[];
  editIdea: (idea_id: string, idea: IIdea) => void;
  removeOneIdea: (idea_id: string) => void;
}

const EditIdea: React.FC<IProps & IPropsGlobal> = props => {
  const ideaId = props.ideaId;
  const myidea = props.ideas.find(i => i._id === ideaId);

  const [contentValue, setContentValue] = React.useState<string>(
    myidea ? myidea.content : ""
  );
  const contentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentValue(event.currentTarget.value);
  };

  if (!myidea) {
    return null;
  }

  //UPDATE Idea by log user
  const updateIdea = (idea_id: string, myidea: IIdea) => {
    fetch("http://localhost:3000/api/idea/edit/" + ideaId, {
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
          props.editIdea(idea_id, i);
        });
      }
    });
  };

  const delIdea = (idea_id: string) => {
    fetch("http://localhost:3000/api/ideas/delete/" + ideaId, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(resp => {
      if (resp.ok) {
        props.removeOneIdea(idea_id);
      }
    });
  };

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
        <div className="col s6">
          <Button
            className="teal lighten-2"
            tooltip="Actualizar"
            tooltipOptions={{ position: "right" }}
            floating
            waves="light"
            small
            icon="edit"
            onClick={() => {
              setTimeout(() => {
                const a: any = document.getElementsByClassName("modal-close");
                a[a.length - 1].click();
              }, 10);
              updateIdea(ideaId, myidea);
            }}
          />
        </div>
        <div className="col s6">
          <Button
            className="red lighten-1"
            tooltip="Eliminar"
            tooltipOptions={{ position: "right" }}
            floating
            waves="light"
            small
            icon="delete_forever"
            onClick={() => delIdea(myidea._id)}
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
  editIdea: actions.editIdea,
  removeOneIdea: actions.removeOneIdea
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditIdea);
