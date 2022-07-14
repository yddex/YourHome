import {DELETE_CHAT, ADD_CHAT, GET_CHATS_ERROR, GET_CHATS_START, GET_CHATS_SUCCESS} from "./types"


const initialState = {
    chats:[],
    loading: false,
    error: null
}

export function dialogsReducer(state = initialState, action){
    switch(action.type){
        case DELETE_CHAT: 
            return {...state, chats: state.chats.filter((chat)=>{
                return chat.id !== action.payload.id
            })}
        case ADD_CHAT: 
            return {...state, chats: [...state.chats, action.payload]}

        case GET_CHATS_START: 
            return {...state, loading: true}
        case GET_CHATS_SUCCESS: 
            return {...state, chats: [...action.payload], loading: false, error: null}
        case GET_CHATS_ERROR: 
            return {...state, error: action.payload}
        default: 
            return state;
    }
}


