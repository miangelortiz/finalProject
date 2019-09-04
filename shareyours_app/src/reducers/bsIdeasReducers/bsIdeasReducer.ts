import { IBsIdea } from "../../interfaces/brainInterface";
import { TAction } from "../../actions/actionTypes";

const initialState: IBsIdea[] = [];

export const bsIdeaReducer = (
  state: IBsIdea[] = initialState,
  action: TAction
): IBsIdea[] => {
  if (action.type === "SET_BSIDEAS") {
    return action.bsIdeas;
  }
  if (action.type === "ADD_BSIDEA") {
    const bsIdeas = state;
    bsIdeas.push(action.bsIdea);
    return [...bsIdeas];
  }
  if (action.type === "UPDATE_BSVOTES") {
    const bsIdeas = state;
    const index = bsIdeas.findIndex(i => i._id === action.bsIdea_id);
    bsIdeas[index] = action.bsIdea;
    return [...bsIdeas];
  }
  return state;
};
