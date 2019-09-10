import React, { useEffect} from "react";
import "./LayoutPage.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Content from "../../components/content/Content";
import { ITag } from "../../interfaces/tagInterface";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { IUser } from "../../interfaces/userInterfaces";
import { Route } from "react-router-dom";
import { IBrain, IBsIdea } from "../../interfaces/brainInterface";
import { IProject } from "../../interfaces/projectInterfaces";
import { IIdea } from "../../interfaces/ideaInterface";
import { IGlobalState } from "../../reducers/reducers";

interface IPropsGlobal {
  token: string;
  setTags: (tags: ITag[]) => void;
  setUsers: (users: IUser[]) => void;
  setBrainTitle: (brainTitle: IBrain[]) => void;
  setBsIdeas: (bsIdeas: IBsIdea[]) => void;
  setProjects: (projects: IProject[]) => void;
  setIdeas: (ideas: IIdea[]) => void;
}

const LayoutPage: React.FC<IPropsGlobal> = props => {
  const getTags = () => {
    fetch("http://localhost:3000/api/tags", {
      headers: {
        "Content-type": "application/json"
      }
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(tags => {
          props.setTags(tags);
        });
      }
    });
  };
  const getUsers = () => {
    fetch("http://localhost:3000/api/users/list", {
      headers: {
        "Content-type": "application/json"
      }
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(users => {
          props.setUsers(users);
        });
      }
    });
  };

  const getBrainTitle = () => {
    fetch("http://localhost:3000/api/brainstorming", {
      headers: {
        "Content-type": "application/json"
      }
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(brainTitle => {
          props.setBrainTitle(brainTitle);
        });
      }
    });
  };

  const getBsIdeas = () => {
    fetch("http://localhost:3000/api/brainstorming/ideas", {
      headers: {
        "Content-type": "application/json"
      }
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(bsIdeas => {
          props.setBsIdeas(bsIdeas);
        });
      }
    });
  };

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

  useEffect(getTags, [props.token]);
  useEffect(getUsers, [props.token]);
  useEffect(getBrainTitle, [props.token]);
  useEffect(getBsIdeas, [props.token]);
  useEffect(getIdeas, [props.token]);
  useEffect(getProjects, [props.token]);

  return (
    <>
      <Route component={Navbar} />
      <div className="row contentRow">
        <div className="col s12 contentCol">
          <Route component={Content} />
        </div>
      </div>
      <div className="row footRow">
        <div className="col s12 footCol">
          <Route component={Footer} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
 
});
const mapDispatchToProps = {
  setTags: actions.setTags,
  setUsers: actions.setUsers,
  setBrainTitle: actions.setBrainTitle,
  setBsIdeas: actions.setBsIdeas,
  setProjects: actions.setProjects,
  setIdeas: actions.setIdeas
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutPage);
