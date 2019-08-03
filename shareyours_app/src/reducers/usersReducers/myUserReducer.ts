import { IMyUser } from "../../interfaces/userInterfaces";
import { TAction } from "../../actions/actionTypes";

const initialState: IMyUser = {};

export const myUserReducer = (
  state: IMyUser = initialState,
  action: TAction
): IMyUser => {
  if (action.type === "SET_MY_USER") {
    return action.myUser;
  }
  return state;
};
