import {UPDATE_SESSION} from "./types"


const initialState = {
   session: null
}


export function sessionReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_SESSION: 
            return {...state, session: action.payload}
        
        default: 
            return state
    }
}


