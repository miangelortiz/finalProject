import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer/tokenReducer";
import { IMyUser, IUser } from "../interfaces/userInterfaces";
import { myUserReducer } from "./usersReducers/myUserReducer";
import { usersReducer } from "./usersReducers/usersReducer";
import { IProject } from "../interfaces/projectInterfaces";
import { projectReducer } from "./projectsReducers/projectReducer";
import { ITag } from "../interfaces/tagInterface";
import { tagsReducer } from "./tagReducer/tagReducer";
import { IIdea } from "../interfaces/ideaInterface";
import { ideasReducer } from "./ideasReducers/ideasReducer";

export interface IGlobalState {
  token: string;
  myUser: IMyUser;
  users: IUser[];
  projects: IProject[];
  tags: ITag[];
  ideas: IIdea[];
}

export const reducers = combineReducers<IGlobalState>({
  token: tokenReducer,
  myUser: myUserReducer,
  users: usersReducer,
  projects: projectReducer,
  tags: tagsReducer,
  ideas: ideasReducer
});
