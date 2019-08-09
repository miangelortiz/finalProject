import React from "react";
import ProjectsList from "../projectlist/ProjectsList";
import { Switch, Route, Redirect } from "react-router-dom";
import MyProjects from "../myprojects/MyProjects";
import AddProject from "../addproject/AddProject";

const Content: React.FC = () => {
  return (
    <Switch>
      <Route path="/projects" exact component={ProjectsList} />
      <Route path="/projects/user/:userId" component={MyProjects} />
      <Route path="/projects/add" component={AddProject} />
      <Redirect to="/projects" />
    </Switch>
  );
};

export default Content;
