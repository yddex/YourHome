import {Routes, Route, useNavigate} from 'react-router-dom';
import {useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import MessagesContainer from '../messages-component/MessagesContainer';
import {initChatsTracking} from '../../store/dialogs'
import Layout from '../layout/Layout';
import "./chatpage.scss"


function ChatPage(){
    const back = useNavigate();
    const dispatch = useDispatch();
    const chats = useSelector((state)=>{
        return state.dialogs.chats
    })

    useEffect(() => {
        const listener = ({ code }) => {
          if (code === "Escape") {
           back("/chats");
          }
        };
        document.addEventListener("keydown", listener);
        return () => document.removeEventListener("keydown", listener);
      }, [back]);

      useEffect(()=>{
        dispatch(initChatsTracking());
      },[])

    return(
        <Routes>
            <Route path="/" element={ <Layout chats={chats} messages={
            <div className="message__container">
                <div className='messageList'>
                    <p className='select-chat'>Выберите чат</p>
                </div>
            </div>}/> } 
            />
            <Route path=":chatid" element={ <Layout chats={chats} messages={ <MessagesContainer/>} />}/>
        </Routes>
    )
}

export default ChatPage;