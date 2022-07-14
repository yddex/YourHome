import {
    DELETE_CHAT,
    ADD_CHAT,
    GET_CHATS_ERROR,
    GET_CHATS_START,
    GET_CHATS_SUCCESS} from "./types"

export const addChat = (chat)=>{
    return { type: ADD_CHAT, payload: chat}
}
export const deleteChat = (chatId)=>{
    return { type: DELETE_CHAT, payload: chatId};
}

export const getChatsStart = ()=>{
    return {type: GET_CHATS_START}
}
export const getChatsSuccess = (chats)=>{
    return {type: GET_CHATS_SUCCESS, payload: chats}
}
export const getChatsErrort = (error)=>{
    return {type: GET_CHATS_ERROR, payload: error}
}

