import React from "react";
import "./ShowProject.css";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { IMyUser } from "../../interfaces/userInterfaces";
import { RouteComponentProps, Link} from "react-router-dom";
import { IIdea } from "../../interfaces/ideaInterface";
import AddIdea from "../addidea/AddIdea";
import * as actions from "../../actions/actions";
import EditIdea from "../editidea/EditIdea";

const { Button, Modal, Icon } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
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

  //Add/remove user id that votes
  const updateVotes = (project_id: string, project: IProject) => {
    const userId = props.myUser.id;
    if (!userId) {
      return null;
    }

    const voted = project.votes.find(i => i === userId);
    if (project.user._id === userId) {
      return console.log("no puedes votarte a ti mismo");
    }
    if (voted) {
      const removeVote = project.votes;
      const index = project.votes.findIndex(v => v === userId);
      removeVote.splice(index, 1);
      var votes = [...removeVote];
    } else {
      const newVote = project.votes;
      newVote.push(userId);
      votes = [...newVote];
    }
    fetch("http://localhost:3000/api/projects/votes/" + project._id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        votes: votes
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
        <div className="row" key={project._id}>
          <div className="col userP">
            Proyecto creado por{" "}
            <span className="showPuser">
              <Link to={"/projects/user/all/" + project.user._id}>
                {" "}
                {project.user.name}
              </Link>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col s7">
            <div className="card-panel ">
              <div className="row titleProject">
                <div className="col s12">{project.title}</div>
              </div>
              <div className="row contentProject">
                <div className="col s12">
                  <p>{project.content}</p>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <Button
                    className="teal lighten-2"
                    floating
                    node="a"
                    waves="light"
                    small
                    onClick={() => updateVotes(project._id, project)}
                    tooltip="¡Me gusta!"
                    tooltipOptions={{ position: "right" }}
                  >
                    {project.votes.length}
                  </Button>
                </div>
              </div>

              <div className="row">
                <div className="col s12">
                  <p>
                    {project.tags.map(tag => (
                      <Link to={"/projects/tag/" + tag._id} key={tag._id}>
                        <div className="chip">{tag.name}</div>
                      </Link>
                    ))}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col s10">
                  <hr />
                  <p>
                    ideado el {new Date(project.created).toLocaleDateString()}{" "}
                    {new Date(project.edited).toLocaleString() >
                      new Date(project.created).toLocaleString() && (
                      <span>
                        {" "}
                        editado el{" "}
                        {new Date(project.edited).toLocaleDateString()}
                      </span>
                    )}
                  </p>
                </div>
                {props.myUser.id !== project.user._id &&
                  projectIdeas.findIndex(
                    i => i.user._id === props.myUser.id
                  ) === -1 && (
                    <div className="col s2">
                      <Modal
                        header="[ aporta tu idea ]"
                        className="modalShow"
                        options={{ dismissible: false }}
                        trigger={
                          <Button
                            className="pulse"
                            floating
                            waves="light"
                            icon="lightbulb_outline"
                            tooltip="¡Aporta una idea!"
                            tooltipoptions={{ position: "right" }}
                          />
                        }
                      >
                        <p>
                          <AddIdea projectId={project._id} />
                        </p>
                      </Modal>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="col s5">
            {projectIdeas.map(i => (
              <div className="card-panel animated  bounceInRight" key={i._id}>
                <div className="row">
                  <div className="col s12">
                    <Icon small>lightbulb_outline</Icon>
                    <p className="showIuser">{i.content}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col s9">
                    <span>por </span>
                    <Link to={"/projects/user/all/" + i.user._id}>
                      <span className="showDuser"> {i.user.name} </span>
                    </Link>
                    <span>el </span>
                    <span>{new Date(i.created).toLocaleDateString()}</span>
                  </div>
                  {props.myUser.id === i.user._id && (
                    <div className="col s3">
                      <Modal
                        header="[ actualiza tu idea ]"
                        options={{ dismissible: false }}
                        className="modalShow"
                        trigger={
                          <a href="#">
                            <Icon tiny>edit</Icon>
                           <span className="showDuser"> editar </span>
                          </a>
                        }
                      >
                        <p>
                          <EditIdea ideaId={i._id} />
                        </p>
                      </Modal>
                    </div>
                  )}
                </div>
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
