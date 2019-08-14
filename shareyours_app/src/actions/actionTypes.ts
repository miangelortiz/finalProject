import { IUser, IMyUser } from "../interfaces/userInterfaces";
import { IProject } from "../interfaces/projectInterfaces";
import { ITag } from "../interfaces/tagInterface";
import { IIdea } from "../interfaces/ideaInterface";


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
};

type TEditProject = {
  type: "EDIT_PROJECT";
  project_id: string;
  project: IProject;
};

type TRemoveProject = {
  type: "REMOVE_PROJECT";
  project_id: string;
};

type TUpdateVotes = {
  type: "UPDATE_VOTES"
  project_id: string;
  project: IProject;
}

//Tags action types
type TSetTags = {
  type: "SET_TAGS";
  tags: ITag[];
};

//Ideas action types
type TsetIdeas = {
  type: "SET_IDEAS";
  ideas: IIdea[];
};

type TAddIdea = {
  type: "ADD_IDEA";
  idea: IIdea;
};

type TRemoveIdea = {
  type: "REMOVE_IDEA";
  project_id: string;
};


export type TAction =
  | TSetToken
  | TSetMyUser
  | TSetUsers
  | TRegUser
  | TSetProjects
  | TAddProject
  | TSetTags
  | TEditProject
  | TRemoveProject
  | TsetIdeas
  | TAddIdea
  | TRemoveIdea
  | TUpdateVotes;
  
