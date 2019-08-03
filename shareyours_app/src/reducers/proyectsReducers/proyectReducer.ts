import { IProyect } from "../../interfaces/proyectInterfaces";
import { TAction } from '../../actions/actionTypes';

const initialState: IProyect[]=[]

export const proyectReducer =(
   state: IProyect[] = initialState,
   action: TAction
): IProyect[]=>{
    if(action.type==="SET_PROYECTS"){
        return action.proyects;
    }
    return state;
}