import {db} from './firebase';

export const getMessagesFB=(chatid)=>{
    return db.ref('messages').child(chatid).get();
}

export const addMessagesFB = (chatid,message)=>{
    return db.ref('messages').child(chatid).push(message);
}

export const deleteMessagesFB = (chatid, message)=>{
    return db.ref('messages').child(chatid).child(message.key).remove();
}
export const deleteAllMessageFB = (chatid)=>{
    return db.ref('messages').child(chatid).remove();
}