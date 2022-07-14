import {useParams} from 'react-router-dom';
import Chats from '../chats-component/Chats';
import './layout.scss';



function Layout({chats,messages}){
   
    const {chatid} = useParams();
    const chatFind = chats.find((chat)=>{
        if(!chatid){
            return true;
        }
        return chat.id.toString()===chatid;
    })

    
return (
    <div className="chat-box">
        <Chats chats={chats}/>
        {chatFind ? messages : <div className="message__container">
                <div className='messageList'>
                    {!chats.length ? <p className='select-chat'>Добавьте чат</p> : <p className='select-chat'>Чат не найден</p>}
                </div>
        </div>}
    </div>
)
}

export default Layout;