import { IUser } from "../../interfaces/userInterfaces";
import { TAction } from "../../actions/actionTypes";

const initialState: IUser[] = [];

export const usersReducer = (
  state: IUser[] = initialState,
  action: TAction
): IUser[] => {
  if (action.type === "SET_USERS") {
    return action.users;
  }
  if (action.type === "REG_USER") {
    const users = state;
    users.push(action.user);
    return [...users];
  }
  if (action.type === "EDIT_USER") {
    const users = state;
    const index = users.findIndex(u => u._id === action.user_id);
    users[index] = action.user;
    return [...users];
  }
  if (action.type === "REMOVE_USER") {
    const users = state;
    const index = users.findIndex(u => u._id === action.user_id);
    users.splice(index, 1);
    return [...users];
  }
  if (action.type === "RESET") {
    return initialState;
  }
  return state;
};
