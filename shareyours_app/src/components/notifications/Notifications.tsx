import React from "react";
import "./Notifications.css";
import { IMyUser, IUser } from "../../interfaces/userInterfaces";
import { IProject } from "../../interfaces/projectInterfaces";
import { IIdea } from "../../interfaces/ideaInterface";
import { RouteComponentProps, Link } from "react-router-dom";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";

interface IPropsGlobal {
  myUser: IMyUser;
  users: IUser[];
  projects: IProject[];
  ideas: IIdea[];
}

const Notifications: React.FC<
  IPropsGlobal & RouteComponentProps<{ userId: string }>
> = props => {
  const myProjects = props.projects.filter(p => p.user._id === props.myUser.id);

  if (!myProjects) {
    return null;
  }

  return (
    <div>
      {myProjects.map(p => (
        <div className="row">
          <span className="voteTitle">{p.title}</span>
          {p.votes.length === 0 && <p>No has recibido aún ningún voto</p>}
          {p.votes.length > 0 && (
            <p>
              Has recibido <span className="totalVotes">{p.votes.length}</span>{" "}
              votos de:
            </p>
            
          )}

          {p.votes.map(v => (
            <Link to={"/projects/user/all/" + v}>
              <span className="vUserLinks">
                {" "}
                {props.users.filter(u => u._id === v).map(n => n.name)} -{" "}
              </span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  users: state.users,
  projects: state.projects
});

export default connect(mapStateToProps)(Notifications);
