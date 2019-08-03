import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";
import { IMyUser, IUser } from "../interfaces/userInterfaces";
import { IProyect } from "../interfaces/proyectInterfaces";


export const setToken:ActionCreator<TAction> = (newToken:string) =>({
    type: "SET_TOKEN",
    newToken
});

export const setMyUser: ActionCreator<TAction> = (myUser: IMyUser) => ({
    type: "SET_MY_USER",
    myUser
  });

export const setUsers: ActionCreator<TAction> = (users: IUser[]) => ({
    type: "SET_USERS",
    users
})

export const regUser: ActionCreator<TAction> = (user:IUser)=>({
    type: "REG_USER",
    user
})

export const setProyects: ActionCreator<TAction> = (proyects:IProyect[])=>({
    type: "SET_PROYECTS",
    proyects
})

