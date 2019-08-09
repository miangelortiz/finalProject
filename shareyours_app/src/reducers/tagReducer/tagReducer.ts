import { ITag } from "../../interfaces/tagInterface";
import { TAction } from "../../actions/actionTypes";


const initialState: ITag[]=[]

export const tagsReducer=(
    state: ITag[]=initialState,
    action: TAction
): ITag[]=>{
    if(action.type==="SET_TAGS"){
        return action.tags;
    }
    return state;
}