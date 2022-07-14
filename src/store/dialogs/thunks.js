import {getChatsFB, addChatsFB, deleteChatsFB} from '../../api/dialogsFB'
import {deleteAllMessageFB} from '../../api/messagesFB'
import {getChatsStart, getChatsSuccess, getChatsErrort} from './action'
import { db } from '../../api/firebase';

//Получение чатов с БД
export const getChatsFromFB =() => async (dispatch)=>{
    dispatch(getChatsStart());
    const chats = [];
    try{
        const snapshot = await getChatsFB();
        snapshot.forEach((snap)=>{
            chats.push({...snap.val(), id: snap.key})
        })
        dispatch(getChatsSuccess(chats))

    }catch(error){
        console.log("ERROR" , error);
        dispatch(getChatsErrort(error));
    }
}

//Добавление нового чата в БД
export const addChatsThunk = (chat)=>()=>{
    addChatsFB(chat);
}

//Удаление чата и сообщений в нем
export const deleteChatsThunk = (chat)=>()=>{
    deleteChatsFB(chat);
    deleteAllMessageFB(chat.id);

}

//отслеживание удалений и добавлений
export const initChatsTracking = () => (dispatch) => {

    db.ref("chats").on("child_removed", () => { 
      dispatch(getChatsFromFB());
    });
  
    db.ref("chats").on("child_added", () => {
      dispatch(getChatsFromFB());
    });
  };
  
