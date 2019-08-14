import React, { useEffect } from "react";
import "./LayoutPage.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Content from "../../components/content/Content";
import { ITag } from "../../interfaces/tagInterface";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { IUser } from "../../interfaces/userInterfaces";

interface IPropsGlobal {
  setTags: (tags: ITag[]) => void;
  setUsers: (users: IUser[]) => void;
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

  useEffect(getTags, []);
  useEffect(getUsers, []);

  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="col s12 contentCol">
          <Content />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setTags: actions.setTags,
  setUsers: actions.setUsers
};
export default connect(
  null,
  mapDispatchToProps
)(LayoutPage);
