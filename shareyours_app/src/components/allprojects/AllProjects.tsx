import React from "react";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { IUser } from "../../interfaces/userInterfaces";

const { Flippy, FrontSide, BackSide } = require("react-flippy");
const { Icon, Button } = require("react-materialize");

interface IPropsGlobal {
  projects: IProject[];
  users: IUser[];
}

const AllProjects: React.FC<
  IPropsGlobal & RouteComponentProps<any>
> = props => {
  return (
    <div className="container">
      <div className="row titlePlist">
        <Icon small>visibility</Icon> [ proyectos -shareYours- ]
      </div>
      <div className="row flipRow">
        {props.projects.map(project => (
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
  projects: state.projects,
  users: state.users
});

export default connect(mapStateToProps)(AllProjects);
