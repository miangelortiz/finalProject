import React from "react";
import "./Notifications.css";
import { IMyUser, IUser } from "../../interfaces/userInterfaces";
import { IProject } from "../../interfaces/projectInterfaces";
import { IIdea } from "../../interfaces/ideaInterface";
import { RouteComponentProps, Link } from "react-router-dom";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { IBsIdea } from "../../interfaces/brainInterface";

interface IPropsGlobal {
  myUser: IMyUser;
  users: IUser[];
  projects: IProject[];
  ideas: IIdea[];
  bsIdeas: IBsIdea[];
}

const Notifications: React.FC<
  IPropsGlobal & RouteComponentProps<{ userId: string }>
> = props => {
  const myProjects = props.projects.filter(p => p.user._id === props.myUser.id);
  const myBsIdea = props.bsIdeas.find(bsi => bsi.user._id === props.myUser.id);

  return (
    <>
      <hr />
      <span className="voteTitle">#proyectos</span>
      <hr />
      {myProjects.length === 0 && <p>No tienes ningun proyecto publicado</p>}
      {myProjects.length > 0 && (
        <>
          {myProjects.map(p => (
            <div className="row" key={p._id}>
              <span className="voteTitle">{p.title}</span>
              {p.votes.length === 0 && <p>No has recibido aún ningún voto</p>}
              {p.votes.length > 0 && (
                <p>
                  Has recibido{" "}
                  <span className="totalVotes">{p.votes.length}</span> votos de:
                </p>
              )}
              {p.votes.map(v => (
                <Link to={"/projects/user/all/" + v} key={v}>
                  <span className="vUserLinks">
                    {" "}
                    {props.users
                      .filter(u => u._id === v)
                      .map(n => n.name)} -{" "}
                  </span>
                </Link>
              ))}
              <br />
              <br />
            </div>
          ))}
        </>
      )}
      <hr/>
      <span className="voteTitle">#proyecto de la semana</span>
      <hr />
      {!myBsIdea && (
        <p>Aún no tienes ninguna idea para el proyecto de la semana</p>
      )}
      {myBsIdea && (
        <>
          <span className="brainITitle">{myBsIdea.brain.title}</span>

          {myBsIdea.votes.length === 0 && (
            <p>No has recibido aún ningún voto</p>
          )}
          {myBsIdea.votes.length > 0 && (
            <p>
              Has recibido{" "}
              <span className="totalVotes">{myBsIdea.votes.length}</span> votos
              para tu idea de:
            </p>
          )}
          {myBsIdea.votes.map(bsv => (
            <Link to={"/projects/user/all/" + bsv} key={bsv}>
              <span className="vUserLinks">
                {" "}
                {props.users.filter(u => u._id === bsv).map(n => n.name)} -{" "}
              </span>
            </Link>
          ))}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  users: state.users,
  projects: state.projects,
  bsIdeas: state.bsIdeas
});

export default connect(mapStateToProps)(Notifications);
