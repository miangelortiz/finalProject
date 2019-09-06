import React from "react";
import { IIdea } from "../../interfaces/ideaInterface";
import { IGlobalState } from "../../reducers/reducers";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";
import { IUser, IMyUser } from "../../interfaces/userInterfaces";
import { Link } from "react-router-dom";

const { Collapsible, CollapsibleItem, Button } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
  users: IUser[];
  ideas: IIdea[];
  removeOneIdea: (idea_id: string) => void;
}

const IdeasAdmin: React.FC<IPropsGlobal> = props => {
  //Delete idea from any user
  const delIdea = (idea_id: string) => {
    fetch("http://localhost:3000/api/ideas/delete/" + idea_id, {
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
    <>
      <div className="container">
        <div className="row adminTitle">
          [ lista de ideas por usuarios ] [ {props.ideas.length} ]
        </div>

        <div className="row">
          <div className="col s4 offset-s4">
            <Collapsible>
              {props.users
                .filter(user => user._id !== props.myUser.id)
                .sort((u1, u2) =>
                  u1.name < u2.name ? -1 : +(u1.name > u2.name)
                )
                .map(u => (
                  <CollapsibleItem header={u.name}>
                    {props.ideas
                      .filter(i => i.user._id === u._id)
                      .map(i => (
                        <>
                          <p className="showAdmin">[ {i.content} ]</p>
                          <p>
                            {" "}
                            <span className="showAdmin">ID: </span>
                            {i._id}
                          </p>
                          <p>
                            Para el proyecto con ID:
                            <Link to={"/projects/" + i.project._id}>
                              <span className="showDuser">
                                {" "}
                                {i.project._id}{" "}
                              </span>
                            </Link>
                          </p>
                          <p>
                            <span className="showAdmin">Creado el </span>
                            {new Date(i.created).toLocaleDateString()}{" "}
                            <span className="showAdmin">a las</span>{" "}
                            {new Date(i.created).toLocaleTimeString()}
                          </p>
                          <p>
                            <Button
                              className="transparent"
                              flat
                              small
                              waves="light"
                              icon="clear"
                              onClick={() => delIdea(i._id)}
                            >
                              <span className="showAdmin">eliminar idea</span>
                            </Button>
                          </p>
                          <hr />
                        </>
                      ))}
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
  myUser: state.myUser,
  users: state.users,
  ideas: state.ideas
});
const mapDispatchToProps = {
  removeOneIdea: actions.removeOneIdea
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdeasAdmin);
