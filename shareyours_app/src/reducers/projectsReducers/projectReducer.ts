import { TAction } from "../../actions/actionTypes";
import { IProject } from "../../interfaces/projectInterfaces";

const initialState: IProject[] = [];

export const projectReducer = (
  state: IProject[] = initialState,
  action: TAction
): IProject[] => {
  if (action.type === "SET_PROJECTS") {
    return action.projects;
  }
  if (action.type === "ADD_PROJECT") {
    const projects = state;
    projects.push(action.project);
    return [...projects];
  }
  if (action.type === "EDIT_PROJECT") {
    const projects = state;
    const index = projects.findIndex(p => p._id === action.project_id);
    projects[index] = action.project;
    return [...projects];
  }
  if (action.type === "REMOVE_PROJECT") {
    const projects = state;
    const index = projects.findIndex(p => p._id === action.project_id);
    projects.splice(index, 1);
    return [...projects];
  }
  if (action.type === "UPDATE_VOTES") {
    const projects = state;
    const index = projects.findIndex(p => p._id === action.project_id);
    projects[index] = action.project;
    return [...projects];
  }
  if (action.type === "RESET") {
    return initialState;
  }
  return state;
};
