import {useParams} from 'react-router-dom';
import { useState,  useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessageThunkFB, addBotMessageThunkFB, messageSelector, initMessagesTracking } from '../../store/messages';
import { format } from "date-fns";
import MessagesField from './MessagesField';

function Message(){
    const authUser = useSelector((state)=>{
        return state.session.session;
    })
    const [message, setMessage] = useState("");
    const {chatid} = useParams();
    const messages = useSelector(messageSelector(chatid));
    const profile = useSelector((state)=>{return state.profile});
    const dispatch = useDispatch();
    let onAddMessage = useCallback((message) => {
        if(message){
            dispatch(addMessageThunkFB(chatid, {author: {name: profile.name, type: "User", userUID: authUser.uid}, text: message, date: format(new Date(), "HH:mm:ss")}));
            dispatch(addBotMessageThunkFB(chatid))
        }
        setMessage("");
    },[chatid, authUser, dispatch, profile])
    

    let changeMessage = useCallback((event) => {
        setMessage(event.target.value)
    },[setMessage])

    let handleInputKey = useCallback((event)=>{
        if(event.code === "Enter"){
            onAddMessage(message);
        }
    },[message, onAddMessage])


    useEffect(()=>{
        dispatch(initMessagesTracking(chatid))
    },[chatid, dispatch])
   return (
        <MessagesField 
        message={message}
        messages={messages} 
        onAddMessage={onAddMessage}
         changeMessage={changeMessage}
         handleInput={handleInputKey}
         user={authUser}/>
    )
}

export default Message;