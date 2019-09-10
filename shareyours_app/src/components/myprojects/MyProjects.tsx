import React from "react";
import "./MyProjects.css";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";

const { Flippy, FrontSide, BackSide } = require("react-flippy");
const { Icon, Button } = require("react-materialize");

interface IPropsGlobal {
  myUser: IMyUser;
  projects: IProject[];
}

const MyProjects: React.FC<
  IPropsGlobal & RouteComponentProps<{ userId: string }>
> = props => {
  const myProjects = props.projects.filter(
    p => p.user._id === props.match.params.userId
  );

  return (
    <div className="container">
      <div className="row titlePlist ">
        <Icon small>face</Icon> [ mis proyectos ]
      </div>
      <div className="row flipRow ">
        {myProjects.length === 0 && <p>Aún no tienes proyectos publicados</p>}
        {myProjects.length > 0 && (
          <>
            {myProjects
              .sort(
                (p1, p2) =>
                  new Date(p2.created).valueOf() -
                  new Date(p1.created).valueOf()
              )
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
                          <span>{project.title}</span>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col s12 myPvoteInfo">
                          <span>
                            {project.votes.length} <Icon tiny>thumb_up</Icon>
                          </span>
                        </div>
                      </div>

                      <div className="row myProw">
                        <div className="col s12">
                          <span className="myPdate">
                            {new Date(project.created).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </FrontSide>
                    <BackSide
                      style={{
                        backgroundColor: "#80cbc4",
                        fontSize: "20px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}
                    >
                      <div className="row myPcontent">
                        <div className="col s12">{project.subtitle}</div>
                        <div className="col s12 tagsP">
                          {project.tags.map(tag => (
                            <span className="chip" key={tag._id}>{tag.name}</span>
                          ))}
                        </div>
                        <div className="col s12">
                          <Link to={"/projects/" + project._id}>
                            <Button
                              className="moreButton"
                              floating
                              waves="light"
                              small
                              icon="zoom_in"
                              tooltip="Ver proyecto"
                              tooltipoptions={{ position: "bottom" }}
                            />
                          </Link>
                        </div>
                      </div>

                      {/* <div className="row myUserInfo">
                      <Icon tiny>thumb_up</Icon> {project.votes.length}
                    </div> */}

                      <div className="row modButton ">
                        <div className="col s12 ">
                          <Link to={"/projects/edit/" + project._id}>
                            Modifica o elimina tu proyecto
                          </Link>
                        </div>
                      </div>
                    </BackSide>
                  </Flippy>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  projects: state.projects
});

export default connect(mapStateToProps)(MyProjects);
