import React, { useEffect } from "react";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { IMyUser, IUser } from "../../interfaces/userInterfaces";
import { RouteComponentProps, Link, Route } from "react-router-dom";
import { IIdea } from "../../interfaces/ideaInterface";
import AddIdea from "../addidea/AddIdea";
import * as actions from "../../actions/actions";

const { Button, Chip, Modal } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
  users: IUser[];
  projects: IProject[];
  ideas: IIdea[];
  updateVotes: (project_id: string, project: IProject) => void;
}

const ShowProject: React.FC<
  IPropsGlobal & RouteComponentProps<{ projectId: string }>
> = props => {
  const project = props.projects.find(
    p => p._id === props.match.params.projectId
  );
  const projectIdeas = props.ideas.filter(
    i => i.project._id === props.match.params.projectId
  );
  if (!project) {
    return null;
  }
  if (!projectIdeas) {
    return null;
  }

  const uProject = props.users.find(u => u._id === project.user._id);
  if (!uProject) {
    return null;
  }

  const updateVotes = (project_id: string, project: IProject) => {
    const id = project._id;
    const newVote = project.votes + 1;

    fetch("http://localhost:3000/api/projects/votes/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        votes: newVote
      })
    }).then(resp => {
      if (resp.ok) {
        resp.json().then((p: IProject) => {
          props.updateVotes(project_id, p);
        });
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s3 offset-s2">
            <div className="card-panel z-depth-4" key={project._id}>
              <strong>Proyecto creado por </strong>
              <Chip>
                <img
                  src={
                    "http://localhost:3000/images/avatars/" +
                    uProject.avatar +
                    ".png"
                  }
                  className="responsive-img"
                  alt="user"
                />
                {project.user.name}
              </Chip>
              <span />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s7">
            <div className="card-panel ">
              <h5>{project.title}</h5>
              <h6>{project.content}</h6>
              <span>
                ideado el{" "}
                <h6>{new Date(project.created).toLocaleDateString()}</h6>
              </span>

              <span>
                editado el{" "}
                <h6>{new Date(project.edited).toLocaleDateString()}</h6>
              </span>

              <Button
                className="teal lighten-2 "
                floating
                node="a"
                waves="light"
                small
                onClick={() => updateVotes(project._id, project)}
              >
                {project.votes}
              </Button>
              <br />
              <br />
              <span>
                {project.tags.map(tag => (
                  <Link to={"/projects/tag/" + tag._id}>
                    <div className="chip">{tag.name}</div>
                  </Link>
                ))}
              </span>
              {props.myUser.id !== project.user._id &&
                projectIdeas.findIndex(i => i.user._id === props.myUser.id) ===
                  -1 && (
                  <Modal
                    header="Aporta una idea al proyecto de"
                    options={{ dismissible: false }}
                    trigger={
                      <Link to={"/idea/add/" + project._id}>
                        <Button
                          className="teal lighten-2"
                          floating
                          node="a"
                          waves="light"
                          large
                          icon="wb_incandescent"
                          tooltip="¡Aporta una idea!"
                          tooltipOptions={{ position: "right" }}
                        />
                      </Link>
                    }
                  >
                    <p>
                      <Route component={AddIdea} />
                    </p>
                  </Modal>
                )}
            </div>
          </div>
          <div className="col s5">
            {projectIdeas.map(i => (
              <div className="card-panel " key={i._id}>
                <h6>Idea de {i.user.name}</h6>
                <h6>{i.content}</h6>
                <h6>{new Date(project.created).toLocaleDateString()}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  myUser: state.myUser,
  users: state.users,
  projects: state.projects,
  ideas: state.ideas
});

const mapDispatchToProps = {
  updateVotes: actions.updateVotes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowProject);
