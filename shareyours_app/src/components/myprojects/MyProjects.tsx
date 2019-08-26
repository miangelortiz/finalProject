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
  if (!myProjects) {
    return null;
  }

  return (
    <div className="container">
      <div className="row titlePlist ">
        <Icon small>face</Icon> [ mis proyectos ]
      </div>
      <div className="row flipRow ">
        {myProjects.map(project => (
          <div className="col flipCol" key={project._id}>
            <Flippy
              flipOnHover={true}
              //    flipOnClick={true}
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
                <div className="row">
                  <span>{project.title}</span>
                </div>
                <div className="row myProw">
                  <span className="myPdate">
                    <Icon tiny>date_range</Icon>{" "}
                    {new Date(project.created).toLocaleDateString()}
                  </span>
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
                    <div className="chip">{tag.name}</div>
                  ))}
                </div>
                <div className="row userInfo">
                  <Icon tiny>thumb_up</Icon> {project.votes.length}
                </div>
                <div className="row">
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
                <div className="row">
                  <Button flat waves="teal" className="modButton">
                    <Link to={"/projects/edit/" + project._id}>
                      <span className="modText">
                        Modifica o elimina tu proyecto
                      </span>
                    </Link>
                  </Button>
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
  myUser: state.myUser,
  projects: state.projects
});

export default connect(mapStateToProps)(MyProjects);
