import { IUser, IMyUser } from "../interfaces/userInterfaces";
import { IProject } from "../interfaces/projectInterfaces";
import { ITag } from "../interfaces/tagInterface";
import { IIdea } from "../interfaces/ideaInterface";
import { IBrain, IBsIdea } from "../interfaces/brainInterface";

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
type TEditUser = {
  type: "EDIT_USER";
  user_id: string;
  user: IUser;
};
type TRemoveUser = {
  type: "REMOVE_USER";
  user_id: string;
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
  type: "UPDATE_VOTES";
  project_id: string;
  project: IProject;
};

//Tags action types
type TSetTags = {
  type: "SET_TAGS";
  tags: ITag[];
};

type TAddTagAdmin = {
  type: "ADD_TAG";
  tag: ITag;
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

type TRemoveOneIdea = {
  type: "REMOVE_ONE_IDEA";
  idea_id: string;
};

type TEditIdea = {
  type: "EDIT_IDEA";
  idea_id: string;
  idea: IIdea;
};

//Brainstorming action types
type TsetBrainTitle = {
  type: "SET_BRAIN_TITLE";
  brainTitle: IBrain[];
};

type TSetBsIdeas = {
  type: "SET_BSIDEAS";
  bsIdeas: IBsIdea[];
};

type TAddBsIdea = {
  type: "ADD_BSIDEA";
  bsIdea: IBsIdea;
};
type TUpdateBSvotes = {
  type: "UPDATE_BSVOTES";
  bsIdea_id: string;
  bsIdea: IBsIdea;
};

type TReset = {
  type: "RESET";
};
export type TAction =
  | TReset
  | TSetToken
  | TSetMyUser
  | TSetUsers
  | TRegUser
  | TEditUser
  | TRemoveUser
  | TSetProjects
  | TAddProject
  | TSetTags
  | TAddTagAdmin
  | TEditProject
  | TRemoveProject
  | TsetIdeas
  | TAddIdea
  | TRemoveIdea
  | TRemoveOneIdea
  | TEditIdea
  | TUpdateVotes
  | TsetBrainTitle
  | TSetBsIdeas
  | TAddBsIdea
  | TUpdateBSvotes;
