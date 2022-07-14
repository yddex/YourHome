import {db} from './firebase';

export const getChatsFB=()=>{
    return db.ref('chats').get()
}

export const addChatsFB = (chat) =>{
    return db.ref('chats').push(chat);
}
export const deleteChatsFB = (chat) =>{
    return db.ref('chats').child(chat.id).remove();
}



