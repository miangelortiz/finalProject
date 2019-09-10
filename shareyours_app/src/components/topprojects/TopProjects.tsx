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
        <Icon small>star</Icon> [ proyectos más valorados ]
      </div>
      <div className="row flipRow">
        {props.projects
          .sort((p1, p2) => p2.votes.length - p1.votes.length)
          .map(project => (
            <div className="col s12 m4 flipCol" key={project._id}>
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
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div className="row">
                    <div className="col s12">
                      <p>{project.title}</p>
                    </div>
                  </div>
                  <div className="row userPlist">
                    <div className="col s12">
                      <img
                        src={
                          "http://localhost:3000/images/avatars/" +
                          project.user.avatar +
                          ".png"
                        }
                        className="imgPlist"
                        alt="user"
                      />
                      <br />

                      <span className="userName">por {project.user.name} </span>
                    </div>
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
                  <div className="row moreInf">
                    <Link to={"/projects/" + project._id}>
                      <Button
                        className="moreButton"
                        floating
                        waves="light"
                        icon="zoom_in"
                        tooltip="Entra, vota y aporta"
                        tooltipoptions={{ position: "bottom" }}
                      />
                    </Link>
                  </div>

                  <div className="row userInfo ">
                    <div className="col s6  userInfoDate">
                      {new Date(project.created).toLocaleDateString()}
                    </div>

                    <div className="col s6 ">
                    {project.votes.length} <Icon tiny>thumb_up</Icon>
                    </div>
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
