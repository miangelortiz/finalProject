import React from "react";
import ProjectsList from "../projectlist/ProjectsList";
import { Switch, Route, Redirect } from "react-router-dom";
import MyProjects from "../myprojects/MyProjects";
import AddProject from "../addproject/AddProject";
import EditMyProject from "../editmyproject/EditMyProject";
import ShowProject from "../showproject/ShowProject";
import TagsProjects from "../tagsprojects/TagsProjects";
import MyUser from "../myuser/MyUser";
import AllProjects from "../topprojects/TopProjects";
import UserProjects from "../userprojects/UserProjects";
import AdminPanel from "../admin/AdminPanel";
import TagAdmin from "../admin/TagAdmin";
import UsersAdmin from "../admin/UsersAdmin";
import ProjectsAdmin from "../admin/ProjectsAdmin";
import IdeasAdmin from "../admin/IdeasAdmin";
import Brainstorming from "../brainstorming/Brainstorming";

const Content: React.FC = () => {
  return (
    <Switch>
      {/* Admin Routes */}
      <Route path="/admin" exact component={AdminPanel} />
      <Route path="/admin/tags" exact component={TagAdmin} />
      <Route path="/admin/users" exact component={UsersAdmin} />
      <Route path="/admin/projects" exact component={ProjectsAdmin} />
      <Route path="/admin/ideas" exact component={IdeasAdmin} />
      {/* Users Routes */}
      <Route path="/projects" exact component={ProjectsList} />
      <Route path="/topProjects" exact component={AllProjects} />
      <Route path="/user/:userId" exact component={MyUser} />
      <Route path="/projects/add" exact component={AddProject} />
      <Route path="/projects/user/:userId" exact component={MyProjects} />
      <Route path="/projects/user/all/:userId" exact component={UserProjects} />
      <Route path="/projects/tag/:tagId" exact component={TagsProjects} />
      <Route path="/projects/:projectId" exact component={ShowProject} />
      <Route path="/projects/edit/:projectId" exact component={EditMyProject} />
      <Route path="/brainstorming" exact component={Brainstorming} />
      <Redirect to="/projects" />
    </Switch>
  );
};

export default Content;
