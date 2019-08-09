import { IUser, IMyUser } from "../interfaces/userInterfaces";
import { IProject } from "../interfaces/projectInterfaces";
import { ITag } from "../interfaces/tagInterface";

//Token action types
type TSetToken = {
  type: "SET_TOKEN";
  newToken: string;
};

//Users action types
type TSetMyUser = {
  type: "SET_MY_USER";
  myUser: IMyUser;
};

type TSetUsers = {
  type: "SET_USERS";
  users: IUser[];
};

type TRegUser = {
  type: "REG_USER";
  user: IUser;
};

//Proyects action types
type TSetProjects = {
  type: "SET_PROJECTS";
  projects: IProject[];
};

type TAddProject = {
  type: "ADD_PROJECT";
  project: IProject;
}

//Tags action types
type TSetTags = {
  type: "SET_TAGS";
  tags: ITag[];
}

export type TAction =
  | TSetToken
  | TSetMyUser
  | TSetUsers
  | TRegUser
  | TSetProjects
  | TAddProject
  | TSetTags;
