/* eslint-disable array-callback-return */
import { List, 
    ListItem, 
    Dialog, 
    DialogTitle, 
    Input, 
    Button, 
    DialogContent, 
    DialogActions, 
    FormControlLabel, 
    Checkbox } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import {deleteChatsThunk, addChatsThunk} from '../../store/dialogs'
import {Link, useParams, useNavigate} from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import './chats.scss';
import { useState} from 'react';

const theme = createTheme({
    components: {
        MuiList: {
            styleOverrides: {
                root: {
                    padding: '0px',
                 }
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    justifyContent: "flex-start",
                    padding: '12px 8px'
                }
            }
        }
    }

})

const isBaseChat=(chatId)=>{
    return chatId === "QOTING_CHAT_ID" || chatId === "SAYING_CHAT_ID";
}


function Chats({chats}){
const [visible, setVisible] = useState(false);
const [newChatName, setNameChat] = useState('');
const [bot, setBot] = useState(true);
const dispatch = useDispatch();
const {chatid} = useParams();
const back = useNavigate();

//Модальное окно
const openVisible = ()=>{
    setVisible(true);
    setNameChat('');
}
const closeVisible = ()=>{
    setVisible(false);
    setNameChat('');
}

//Создание нового чата
const changeName = (event)=>{
    setNameChat(event.target.value);
}
const changeBot = ()=>{
    setBot(!bot)
}
const onAddChat = (name)=>{
    dispatch(addChatsThunk({name: name, bot: bot}));
    setNameChat('');
    setVisible(false);
    setBot(true);
}

const onDeleteChat = (chat)=>{
    dispatch(deleteChatsThunk(chat));

        setTimeout(()=>{
            back("/chats");
        },50)
    
}


// useEffect(()=>{
//     dispatch(getChatsFromFB());
// },[])
return (
    <ThemeProvider theme={theme}>
        <div className='chats'>
        <h4 className='heading__chats'>Your Chats</h4>
        
            <List className='chats__list'>
            {chats.map((chat)=>{
                if(isBaseChat(chat.id)){
                 return <Link to={`/chats/${chat.id}`} key={chat.id} className="chats__link">
                     <ListItem className='chats__item' alignItems="center" selected={chat.id.toString() === chatid}>
                        <MailIcon className='chat__icon mail'/><span className="chats__name">{chat.name}</span>
                    </ListItem>
                    </Link>
                }
                })}
                {chats.map((chat)=>{
                    if(!isBaseChat(chat.id)){
                    return <Link to={`/chats/${chat.id}`} key={chat.id} className="chats__link">
                        <ListItem className='chats__item' alignItems="center" selected={chat.id.toString() === chatid}>
                            <MailIcon className='chat__icon mail'/><span className="chats__name">{chat.name}</span>
                            <ClearIcon onClick={()=>{onDeleteChat(chat)}} className='chat__icon clear'/>
                        </ListItem>
                        </Link>
                    }
                })}
                
            </List>
            <div className='heading__chats heading__chats_add' onClick={openVisible}><AddIcon className="chat__icon add"/></div>
            <Dialog 
            className="dialog"
            open={visible} 
            onClose={closeVisible} 
            maxWidth='md'>
                
                 <DialogTitle>Введите название чата:</DialogTitle>
                 <DialogContent className='dialog__content'>
                    <Input value={newChatName} onChange={changeName}/>
                    <FormControlLabel 
                    control={<Checkbox defaultChecked={true} onChange={changeBot}/>}
                    label="BOT"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{onAddChat(newChatName)}} disabled={!newChatName}>Добавить</Button>
                    <Button onClick={closeVisible}>Закрыть</Button>
                </DialogActions>
            </Dialog>
            

        </div>
    </ThemeProvider>

)

}

export default Chats;