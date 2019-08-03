import { IUser, IMyUser } from "../interfaces/userInterfaces";
import { IProyect } from "../interfaces/proyectInterfaces";

type TSetToken = {
  type: "SET_TOKEN";
  newToken: string;
};

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

type TSetProyects ={
  type: "SET_PROYECTS"
  proyects: IProyect[];

}

export type TAction = TSetToken | TSetMyUser | TSetUsers | TRegUser | TSetProyects;
