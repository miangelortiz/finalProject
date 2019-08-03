import { TAction } from "../../actions/actionTypes";
const initialState: string = "";

export const tokenReducer = (
  state: string = initialState,
  action: TAction
): string => {
  if (action.type === "SET_TOKEN") {
    return action.newToken;
  }
  return state;
};
