import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";
import { IMyUser, IUser } from "../interfaces/userInterfaces";
import { IProject } from "../interfaces/projectInterfaces";
import { ITag } from "../interfaces/tagInterface";
import { IIdea } from "../interfaces/ideaInterface";
import { IBrain, IBsIdea } from "../interfaces/brainInterface";

//Token action
export const setToken: ActionCreator<TAction> = (newToken: string) => ({
  type: "SET_TOKEN",
  newToken
});

//Users actions
export const setMyUser: ActionCreator<TAction> = (myUser: IMyUser) => ({
  type: "SET_MY_USER",
  myUser
});

export const setUsers: ActionCreator<TAction> = (users: IUser[]) => ({
  type: "SET_USERS",
  users
});

export const regUser: ActionCreator<TAction> = (user: IUser) => ({
  type: "REG_USER",
  user
});

export const editUser: ActionCreator<TAction> = (
  user_id: string,
  user: IUser
) => ({
  type: "EDIT_USER",
  user_id,
  user
});

export const removeUser: ActionCreator<TAction> = (user_id: string) => ({
  type: "REMOVE_USER",
  user_id
});

//Proyects actions
export const setProjects: ActionCreator<TAction> = (projects: IProject[]) => ({
  type: "SET_PROJECTS",
  projects
});

export const addNewProject: ActionCreator<TAction> = (project: IProject) => ({
  type: "ADD_PROJECT",
  project
});

export const editProject: ActionCreator<TAction> = (
  project_id: string,
  project: IProject
) => ({
  type: "EDIT_PROJECT",
  project_id,
  project
});

export const removeProject: ActionCreator<TAction> = (project_id: string) => ({
  type: "REMOVE_PROJECT",
  project_id
});

export const updateVotes: ActionCreator<TAction> = (
  project_id: string,
  project: IProject
) => ({
  type: "UPDATE_VOTES",
  project_id,
  project
});

//Tags action
export const setTags: ActionCreator<TAction> = (tags: ITag[]) => ({
  type: "SET_TAGS",
  tags
});

export const addTag: ActionCreator<TAction> = (tag: ITag) => ({
  type: "ADD_TAG",
  tag
});

//Ideas actions
export const setIdeas: ActionCreator<TAction> = (ideas: IIdea[]) => ({
  type: "SET_IDEAS",
  ideas
});

export const addNewIdea: ActionCreator<TAction> = (idea: IIdea) => ({
  type: "ADD_IDEA",
  idea
});

export const removeIdea: ActionCreator<TAction> = (project_id: string) => ({
  type: "REMOVE_IDEA",
  project_id
});

export const removeOneIdea: ActionCreator<TAction> = (idea_id: string) => ({
  type: "REMOVE_ONE_IDEA",
  idea_id
});

export const editIdea: ActionCreator<TAction> = (
  idea_id: string,
  idea: IIdea
) => ({
  type: "EDIT_IDEA",
  idea_id,
  idea
});

//Brainstorming actions
export const setBrainTitle: ActionCreator<TAction> = (
  brainTitle: IBrain[]
) => ({
  type: "SET_BRAIN_TITLE",
  brainTitle
});

export const setBsIdeas: ActionCreator<TAction> = (bsIdeas: IBsIdea[]) => ({
  type: "SET_BSIDEAS",
  bsIdeas
});

export const addBsIdea: ActionCreator<TAction> = (bsIdea: IBsIdea) => ({
  type: "ADD_BSIDEA",
  bsIdea
});

export const updateBSvotes: ActionCreator<TAction> = (
  bsIdea_id: string,
  bsIdea: IBsIdea
) => ({
  type: "UPDATE_BSVOTES",
  bsIdea_id,
  bsIdea
});

export const Reset: ActionCreator<TAction> = () => ({
  type: "RESET"
});
