import React, { useEffect } from "react";
import "./ProjectList.css";
import { IMyUser } from "../../interfaces/userInterfaces";
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

  useEffect(getProjects, [props.token]);
  useEffect(getIdeas, [props.token]);

  return (
    <div className="container">
      <div className="row ">
        {props.projects
          .sort((p1, p2) => p2.votes - p1.votes)
          .slice(0, 3)
          .map(project => (
            <div className="col s3 flipCol" key={project._id}>
              <Flippy
                flipOnHover={true}
                //flipOnClick={true}
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
                  <span>{project.title}</span>
                </FrontSide>
                <BackSide
                  style={{
                    backgroundColor: "#80cbc4",
                    fontSize: "20px",
                    textAlign: "center"
                  }}
                >
                  <span> {project.subtitle}</span>
                  <br />
                  <br />
                  <span>
                    {project.tags.map(tag => (
                      <div className="chip">{tag.name}</div>
                    ))}
                  </span>
                  <br />
                  <span>{new Date(project.created).toLocaleDateString()}</span>
                  <br />
                  <span>
                    <Icon tiny>favorite_border</Icon>
                    {project.votes}
                  </span>
                  <br />
                  <span>proyecto creado por </span>
                  {project.user.name}
                  <Link to={"/projects/" + project._id}>
                     <Button
                          className="moreButton"
                          floating
                          node="a"
                          waves="light"
                          large
                          icon="zoom_in"
                          tooltip="Entra, vota y aporta"
                          tooltipoptions={{ position: "bottom" }}
                        />
                  </Link>
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
