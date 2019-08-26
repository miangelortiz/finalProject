import React from "react";
import { IUser } from "../../interfaces/userInterfaces";
import { IProject } from "../../interfaces/projectInterfaces";
import { RouteComponentProps, Link } from "react-router-dom";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";

const { Flippy, FrontSide, BackSide } = require("react-flippy");
const { Icon, Button } = require("react-materialize");

interface IPropsGlobal {
  users: IUser[];
  projects: IProject[];
}

const UserProjects: React.FC<
  IPropsGlobal & RouteComponentProps<{ userId: string }>
> = props => {
  const userProjects = props.projects.filter(
    p => p.user._id === props.match.params.userId
  );
  const user = props.users.find(u => u._id === props.match.params.userId);

  if (!user) {
    return null;
  }

  if (!userProjects) {
    return null;
  }

  return (
    <div className="container">
      <div className="row titlePlist">
        <Icon small>folder_shared</Icon> [ proyectos de {user.name} ]
      </div>
      <div className="row flipRow">
        {userProjects.map(project => (
          <div className="col flipCol" key={project._id}>
            <Flippy
              flipOnHover={true}
              flipDirection="horizontal"
              style={{ width: "300px", height: "300px" }}
            >
              <FrontSide
                style={{
                  backgroundColor: "#083B66",
                  fontSize: "25px",
                  textAlign: "center",
                  color: "white"
                }}
              >
                <p>{project.title}</p>
                <div className="row userPlist">
                  <img
                    src={
                      "http://localhost:3000/images/avatars/" +
                      project.user.avatar +
                      ".png"
                    }
                    className="imgPlist"
                    alt="user"
                  />

                  <span className="userProject">por {project.user.name} </span>
                </div>
              </FrontSide>
              <BackSide
                style={{
                  backgroundColor: "#80cbc4",
                  fontSize: "20px",
                  textAlign: "center"
                }}
              >
                <div className="row">{project.subtitle}</div>
                <div className="row tagsP">
                  {project.tags.map(tag => (
                    <div className="chip" key={tag._id}>
                      {tag.name}
                    </div>
                  ))}
                </div>

                <div className="row userInfo">
                  <Icon tiny>date_range</Icon>
                  {new Date(project.created).toLocaleDateString()}
                </div>

                <div className="row userInfo">
                  <Icon tiny>thumb_up</Icon> {project.votes.length}
                </div>
                <div className="row moreInf">
                  <Link to={"/projects/" + project._id}>
                    <Button
                      className="moreButton"
                      floating
                      waves="light"
                      medium
                      icon="zoom_in"
                      tooltip="Entra, vota y aporta"
                      tooltipoptions={{ position: "bottom" }}
                    />
                  </Link>
                </div>
              </BackSide>
            </Flippy>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users,
  projects: state.projects
});

export default connect(mapStateToProps)(UserProjects);
