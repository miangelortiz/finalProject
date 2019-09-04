import { IBrain } from "../../interfaces/brainInterface";
import { TAction } from "../../actions/actionTypes";

const initialState: IBrain[] = [];

export const brainReducer = (
  state: IBrain[] = initialState,
  action: TAction
): IBrain[] => {
  if (action.type === "SET_BRAIN_TITLE") {
    return action.brainTitle;
  }
  return state;
};
