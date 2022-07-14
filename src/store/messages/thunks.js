import {
    format
} from "date-fns";
import {debounce} from 'underscore'
import {
    getMessagesFB,
    addMessagesFB,
} from '../../api/messagesFB'
import {
    db
} from '../../api/firebase.js';
import {
    addMessage,
    getMessagesStart,
    getMessagesSuccess,
    getMessagesError
} from "./action.js"
import botAnswer from "./botAnswers.js"


//REDUX
export const addMessageThunk = (chatid, message) => (dispatch) => {
    dispatch(addMessage(chatid, message));
    if (message.author.type === "User") {
        setTimeout(() => {
            dispatch(addMessage(chatid, {
                author: {
                    name: 'Bot',
                    type: "Bot"
                },
                text: botAnswer(chatid),
                date: format(new Date(), "HH:mm:ss")
            }));
        }, 500);
    }
}


//FIREBASE
//Получение сообщений из чата


export const getMessagesFromChatFB = (chatid) => async (dispatch) => {
    dispatch(getMessagesStart());
    const messages = [];
    try {
        const snapshot = await getMessagesFB(chatid);
        snapshot.forEach((snap) => {
            messages.push({
                ...snap.val(),
                key: snap.key
            })
        });
        dispatch(getMessagesSuccess(chatid, messages));
    } catch (error) {
        console.log("messages.thunk.error", error);
        dispatch(getMessagesError(error));
    }
}


//Отправка сообщения
export const addMessageThunkFB = (chatid, message) => async (dispatch) => {
    try {
        await addMessagesFB(chatid, message);
    } catch (error) {
        console.log("add.message.FB.err: ", error)
    }
}

//Отправка сообщения от бота
export const addBotMessageThunkFB = (chatid)=>(_,getState)=>{
    const state = getState();
    const find = state.dialogs.chats.find((chat)=>{
        return chatid === chat.id;
    })
    if(find.bot){
    debounce(addMessagesFB(chatid, {
         author: {
            name: 'Bot',
                type: "Bot"
         },
            text: botAnswer(chatid),
         date: format(new Date(), "HH:mm:ss")
        }),500);
    }
}
//Отслеживание(удаление, добавление)
export const initMessagesTracking = (chatid) => (dispatch) => {

    db.ref("messages").on("child_removed", () => {
        dispatch(getMessagesFromChatFB(chatid));
    });

    db.ref("messages").child(chatid).on("child_removed", () => {
        dispatch(getMessagesFromChatFB(chatid));
    });

    db.ref("messages").child(chatid).on("child_added", () => {
        dispatch(getMessagesFromChatFB(chatid));
    });
};