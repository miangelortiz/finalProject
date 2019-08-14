import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";
import { IMyUser, IUser } from "../interfaces/userInterfaces";
import { IProject } from "../interfaces/projectInterfaces";
import { ITag } from "../interfaces/tagInterface";
import { IIdea } from "../interfaces/ideaInterface";

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

//Ideas actions
export const setIdeas: ActionCreator<TAction> = (ideas:IIdea[])=> ({
  type: "SET_IDEAS",
  ideas
})

export const addNewIdea: ActionCreator<TAction> = (idea:IIdea)=>({
  type: "ADD_IDEA",
  idea
})

export const removeIdea: ActionCreator<TAction> = (project_id: string) => ({
  type: "REMOVE_IDEA",
  project_id
});

