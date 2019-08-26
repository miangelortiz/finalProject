import React, { useEffect } from "react";
import "./ProjectList.css";
import { IMyUser, IUser } from "../../interfaces/userInterfaces";
import * as actions from "../../actions/actions";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { ITag } from "../../interfaces/tagInterface";
import { Link, RouteComponentProps } from "react-router-dom";
import { IIdea } from "../../interfaces/ideaInterface";

const { Flippy, FrontSide, BackSide } = require("react-flippy");
const { Icon, Button } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
  users: IUser[];
  projects: IProject[];
  tags: ITag[];
  setProjects: (projects: IProject[]) => void;
  setIdeas: (ideas: IIdea[]) => void;
}

const ProjectsList: React.FC<
  IPropsGlobal & RouteComponentProps<any>
> = props => {
  const getProjects = () => {
    fetch("http://localhost:3000/api/projects", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(projects => {
          props.setProjects(projects);
        });
      }
    });
  };

  const getIdeas = () => {
    fetch("http://localhost:3000/api/ideas", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(ideas => {
          props.setIdeas(ideas);
        });
      }
    });
  };

  useEffect(getIdeas, [props.token]);
  useEffect(getProjects, [props.token]);

  return (
    <div className="container">
      <div className="row titlePlist">
        <Icon small>star</Icon> [ los tres más valorados ]
      </div>
      <div className="row flipRow ">
        {props.projects
          .sort((p1, p2) => p2.votes.length - p1.votes.length)
          .slice(0, 3)
          .map(project => (
            <div className="col flipCol " key={project._id}>
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

                    <span>por {project.user.name}</span>
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
  token: state.token,
  myUser: state.myUser,
  users: state.users,
  tags: state.tags,
  projects: state.projects
});

const mapDispatchToProps = {
  setProjects: actions.setProjects,
  setIdeas: actions.setIdeas
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsList);
