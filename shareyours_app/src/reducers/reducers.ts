import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer/tokenReducer";
import { IMyUser, IUser } from "../interfaces/userInterfaces";
import { myUserReducer } from "./usersReducers/myUserReducer";
import { usersReducer } from "./usersReducers/usersReducer";
import { IProyect } from "../interfaces/proyectInterfaces";
import { proyectReducer } from "./proyectsReducers/proyectReducer";

export interface IGlobalState {
  token: string;
  myUser: IMyUser;
  users: IUser[];
  proyects: IProyect[];
}

export const reducers = combineReducers<IGlobalState>({
  token: tokenReducer,
  myUser: myUserReducer,
  users: usersReducer,
  proyects: proyectReducer
});
