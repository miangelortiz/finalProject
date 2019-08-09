import React from "react";
import { IMyUser } from "../../interfaces/userInterfaces";
import { IProject } from "../../interfaces/projectInterfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

const { Flippy, FrontSide, BackSide } = require("react-flippy");
const { Icon } = require("react-materialize");

interface IPropsGlobal {
  //   token: string;
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
    console.log("no hay proyectos!!!");
  }

  return (
    <div className="container">
      <div className="row ">
        {myProjects.map(project => (
          <div className="col s3 flipCol" key={project._id}>
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
              </BackSide>
            </Flippy>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  //   token: state.token,
  myUser: state.myUser,
  projects: state.projects
});

export default connect(mapStateToProps)(MyProjects);
