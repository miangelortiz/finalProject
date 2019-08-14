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
  //   const tagss =props.tags.filter(t=>t._id===props.match.params.tagId)
  const projects = props.projects.filter(p =>
    p.tags.find(t => t._id === props.match.params.tagId)
  );

  const tag = props.tags.find(t=>t._id===props.match.params.tagId);

  if (!projects) {
    return null;
  }
  if(!tag){
    return null;
  }

  return (
    <div className="container">
      <div className="row ">
        <h4>Proyectos etiquetados con {tag.name}</h4>
        {projects.map(p => (
          <div className="col s3 flipCol" key={p._id}>
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
                <span>{p.title}</span>
              </FrontSide>
              <BackSide
                style={{
                  backgroundColor: "#80cbc4",
                  fontSize: "20px",
                  textAlign: "center"
                }}
              >
                <span> {p.subtitle}</span>
                <br />
                <br />
                <span>
                  {p.tags.map(tag => (
                    <div className="chip">{tag.name}</div>
                  ))}
                </span>
                <br />
                <span>{new Date(p.created).toLocaleDateString()}</span>
                <br />
                <span>
                  <Icon tiny>favorite_border</Icon>
                  {p.votes}
                </span>
                <br />
                <span>proyecto creado por </span>
                {p.user.name}
                <Link to={"/projects/" + p._id}>
                  <Button
                    className="moreButton"
                    floating
                    node="a"
                    waves="light"
                    large
                    icon="zoom_in"
                    tooltip="Entra, vota y aporta"
                    tooltipOptions={{ position: "bottom" }}
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
  tags: state.tags,
  projects: state.projects
});

export default connect(mapStateToProps)(TagsProjects);
