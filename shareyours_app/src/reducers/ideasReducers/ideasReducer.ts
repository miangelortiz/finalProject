import { IIdea } from "../../interfaces/ideaInterface";
import { TAction } from "../../actions/actionTypes";

const initialState: IIdea[] = [];

export const ideasReducer = (
  state: IIdea[] = initialState,
  action: TAction
): IIdea[] => {
  if (action.type === "SET_IDEAS") {
    return action.ideas;
  }
  if (action.type === "ADD_IDEA") {
    const ideas = state;
    ideas.push(action.idea);
    return [...ideas];
  }
  if (action.type === "REMOVE_IDEA") {
    const ideas = state;
    const index = ideas.findIndex(i => i.project._id === action.project_id);
    ideas.splice(index, 1);
    return [...ideas];
  }
  if (action.type === "REMOVE_ONE_IDEA") {
    const ideas = state;
    const index = ideas.findIndex(i => i._id === action.idea_id);
    ideas.splice(index, 1);
    return [...ideas];
  }
  if (action.type === "EDIT_IDEA") {
    const ideas = state;
    const index = ideas.findIndex(i => i._id === action.idea_id);
    ideas[index] = action.idea;
    return [...ideas];
  }
  if (action.type === "RESET") {
    return initialState;
  }

  return state;
};
