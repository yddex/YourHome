import { useEffect, useRef,useCallback } from 'react';
import { Input, InputAdornment } from '@mui/material';
import {Send} from '@mui/icons-material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import './messages.scss';

const theme = createTheme({
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
              border: "0"
           }
      },
      }
    }
  })


const MessagesField = ({message,messages,onAddMessage,changeMessage,handleInput, user}) => {

    const inputRef = useRef(null);
    const messagesRef = useRef(null);

    let handleScroll = useCallback(()=>{
        if(messagesRef.current){
            messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
        } 
    }, [])


    useEffect(()=>{
        handleScroll();
    },[messages, handleScroll])

    useEffect(()=>{
        inputRef.current?.focus();
    },[])


   return ( 
       <div className='message__container'>
        <ThemeProvider theme={theme}>
            <div className="messageList" ref={messagesRef}>
                {messages.map((message,i) => {
                    return <div key={i} className={`message message__${message.author?.userUID === user.uid ? "user" : "nouser" }`}>
                        <p className="text">{message.text}</p>
                        <div className="message-info">
                            <p className='author'>{message.author.name}</p>
                            <p className='date'>{message.date}</p>
                        </div>
                      </div>
                })}
            </div>
          <Input 
          inputRef={inputRef}
          className='input_message'
          onKeyDown={handleInput}
          fullWidth
          value = {message} 
          onChange={(event)=>{changeMessage(event)}}
          placeholder="Введите сообщение..."
          endAdornment={message && <InputAdornment position="end"><Send onClick={()=>onAddMessage(message)} className='send_icon'/></InputAdornment>}
          /> 
          </ThemeProvider>
          </div>
   )
}

export default MessagesField;