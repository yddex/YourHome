import {ADD_MESSAGE, GET_MESSAGES_START, GET_MESSAGES_SUCCESS, GET_MESSAGES_ERROR} from "./types"


const initialState = {
    messages: {},
    loading: false,
    error: null
}

export function messagesReducer(state = initialState, action){
    switch(action.type){
        case ADD_MESSAGE: 
            return {
                ...state, 
                messages: {...state.messages,  
                    [action.payload.chatid]:[...(state[action.payload.chatid] ?? []), action.payload.message]}}
                    
        case GET_MESSAGES_START: 
            return {
            ...state, loading: true
            }
        case GET_MESSAGES_SUCCESS: 
            return{
                ...state, 
                messages: {...state.messages, [action.payload.chatid]:[...action.payload.messages]},
                loading: false,
                error: null
            }
        case GET_MESSAGES_ERROR: 
            return {
                ...state, 
                loading: false,
                error: action.payload
            }
        default: 
            return state;
    }
}


