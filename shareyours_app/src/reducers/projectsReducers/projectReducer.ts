import { TAction } from "../../actions/actionTypes";
import { IProject } from "../../interfaces/projectInterfaces";


const initialState: IProject[] = [];

export const projectReducer = (
  state: IProject[] = initialState,
  action: TAction
): IProject[] => {
  if (action.type === "SET_PROJECTS") {
   return action.projects 
  }
  if (action.type === "ADD_PROJECT"){
    const projects=state;
    projects.push(action.project)
    return [...projects]
  }
  return state;
};
