import React from "react";
import ProjectsList from "../projectlist/ProjectsList";
import { Switch, Route, Redirect } from "react-router-dom";
import MyProjects from "../myprojects/MyProjects";
import AddProject from "../addproject/AddProject";
import EditMyProject from "../editmyproject/EditMyProject";
import ShowProject from "../showproject/ShowProject";
import TagsProjects from "../tagsprojects/TagsProjects";

const Content: React.FC = () => {
  return (
    <Switch>
      <Route path="/projects" exact component={ProjectsList} />
      <Route path="/projects/add" exact component={AddProject} />
      <Route path="/projects/user/:userId" exact component={MyProjects} />
      <Route path="/projects/tag/:tagId" exact component={TagsProjects} />
      <Route path="/projects/:projectId" exact component={ShowProject} />
      <Route path="/projects/edit/:projectId" exact component={EditMyProject} />
      <Redirect to="/projects" />
    </Switch>
  );
};

export default Content;
