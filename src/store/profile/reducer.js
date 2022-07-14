import { UPDATE_PROFILE} from "./types"


const initialState = {
    name: "User",
    surname: "Surname",
    isVisibleInfo: true
}


export function profileReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_PROFILE:
            return {...action.payload}
        default: 
            return state
    }
}


