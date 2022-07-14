import { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import {setBaseProfileThunk} from '../../store/profile'
import { firebaseApp } from "../../api/firebase";
import { Button, TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";

import './auth.scss'


const isValidEmail = (str)=>{
    return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(str);
}
const isValidPassword = (str)=>{
    return /^.{5,}$/.test(str);
}

export function SignUpPage() {
   const [valid, setValid] = useState({ email: false, password: false});
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch()
   const [error, setError] = useState(null);
   const navigate = useNavigate();

  const onSignUp = async (email, password) => {
    try{
      await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
      dispatch(setBaseProfileThunk());
       setError(null);
       navigate('/login');
   }catch(e){
       console.log("error", error)
       setError(e);
   }
    
  };
  useEffect(()=>{
    if(isValidEmail(email)){
        setValid({...valid, email:true})
    }else {
        setValid({...valid, email:false})}
    
  },[email])

  useEffect(()=>{
    if(isValidPassword(password)){
        setValid({...valid, password:true})
    } else {
        setValid({...valid, password:false})
    }
    },[password])
   
  return (
    <div className="container">
      
    <div className="auth__form signup">
    <h1 className="auth__header">SignUp</h1>
      <TextField
       className="auth__input"
      error={!valid.email && valid.email}
      required
        autoComplete="off"
        label="Email"
        placeholder="Email"
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        value={email}
      />
      {!valid.email && email && <p className="auth__helperText">Некорректный Email. Пример: somename@gmail.com</p>}

      <TextField
       className="auth__input"
      type="password"
      error={!valid.password && password}
      required
      autoComplete="off"
       label="Password"
        placeholder="Password"
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        value={password}
      />
      {!valid.password && password && <p className="auth__helperText">*Пароль должен быть не меньше 6 символов</p>}


      {!!error && <p className="error__auth">{error.message}</p>}
      <Button
      variant="contained"
      className="auth__submit"
      disabled={!valid.email || !valid.password}
        onClick={() => {
          onSignUp(email, password);
        }}> SignUp</Button>
       </div>
    </div>
  );
}
