import {ADD_MESSAGE, GET_MESSAGES_START, GET_MESSAGES_SUCCESS, GET_MESSAGES_ERROR} from "./types"

export const addMessage = (chatid, message)=>{
    return { 
        type: ADD_MESSAGE, 
        payload: {
            chatid: chatid,
            message: message
    }}
}

export const getMessagesStart = ()=>{
    return {type: GET_MESSAGES_START}
}
export const getMessagesSuccess = (chatid, messages)=>{
    return {
        type: GET_MESSAGES_SUCCESS, 
        payload:{
            chatid: chatid,
            messages: messages}
     }
}
export const getMessagesError = (error)=>{
    return {type: GET_MESSAGES_ERROR, payload: error}
}



