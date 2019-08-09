import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";
import { IMyUser, IUser } from "../interfaces/userInterfaces";
import { IProject } from "../interfaces/projectInterfaces";
import { ITag } from "../interfaces/tagInterface";

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

//Tags action
export const setTags: ActionCreator<TAction> = (tags: ITag[]) => ({
  type: "SET_TAGS",
  tags
});
