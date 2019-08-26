import React from "react";
import { ITag } from "../../interfaces/tagInterface";
import { IProject } from "../../interfaces/projectInterfaces";
import { RouteComponentProps, Link } from "react-router-dom";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";

const { Flippy, FrontSide, BackSide } = require("react-flippy");
const { Icon, Button } = require("react-materialize");

interface IPropsGlobal {
  tags: ITag[];
  projects: IProject[];
}

const TagsProjects: React.FC<
  IPropsGlobal & RouteComponentProps<{ tagId: string }>
> = props => {
  const projects = props.projects.filter(p =>
    p.tags.find(t => t._id === props.match.params.tagId)
  );

  const tag = props.tags.find(t => t._id === props.match.params.tagId);

  if (!projects) {
    return null;
  }
  if (!tag) {
    return null;
  }

  return (
    <div className="container">
      <div className="row titlePlist">#{tag.name}</div>
      <div className="row flipRow">
        {projects.map(p => (
          <div className="col flipCol" key={p._id}>
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
                <p>{p.title}</p>
                <div className="row userPlist">
                  <img
                    src={
                      "http://localhost:3000/images/avatars/" +
                      p.user.avatar +
                      ".png"
                    }
                    className="imgPlist"
                    alt="user"
                  />

                  <span className="userProject">por {p.user.name} </span>
                </div>
              </FrontSide>
              <BackSide
                style={{
                  backgroundColor: "#80cbc4",
                  fontSize: "20px",
                  textAlign: "center"
                }}
              >
                <div className="row">{p.subtitle}</div>
                <div className="row tagsP">
                  {p.tags.map(tag => (
                    <div className="chip" key={tag._id}>
                      {tag.name}
                    </div>
                  ))}
                </div>
                <div className="row userInfo">
                  <Icon tiny>date_range</Icon>
                  {new Date(p.created).toLocaleDateString()}
                </div>

                <div className="row userInfo">
                  <Icon tiny>thumb_up</Icon> {p.votes.length}
                </div>
                <div className="row moreInf">
                  <Link to={"/projects/" + p._id}>
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
  tags: state.tags,
  projects: state.projects
});

export default connect(mapStateToProps)(TagsProjects);
