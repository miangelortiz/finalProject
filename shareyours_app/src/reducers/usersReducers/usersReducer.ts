import { IUser } from "../../interfaces/userInterfaces";
import { TAction } from "../../actions/actionTypes";


const initialState : IUser[]=[]


export const usersReducer =(
    state: IUser[]=initialState,
    action: TAction
): IUser[]=>{
    if (action.type==="SET_USERS"){
        return action.users;
    }
    if(action.type==="REG_USER"){
        const users=state;
        users.push(action.user);
        return [...users]
    }
    return state;
}
