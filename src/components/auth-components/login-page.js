import { useState} from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../../api/firebase";
import { Button, TextField} from "@mui/material";
import {updateSessionThunk} from '../../store/session'
import './auth.scss'






export function LoginPage() {
  const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);

   const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = async (email, password) => {
        try{
           await firebaseApp.auth().signInWithEmailAndPassword(email, password);
            setError(null);
            dispatch(updateSessionThunk())
            navigate('/profile');
        }catch(e){
            console.log("error", error)
            setError(e);
        }
    
  };
  return (
    <div className="container">
    <div className="auth__form Login">
    <h1 className="auth__header">Login</h1>
      <TextField
       className="auth__input"
      required
        autoComplete="off"
        label="Email"
        placeholder="Email"
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        value={email}
      />
      <TextField
      className="auth__input"
      required
      type="password"
      autoComplete="off"
       label="Password"
        placeholder="Password"
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        value={password}
      />
    {!!error && <p className="error__auth">{error.message}</p>}
      <Button
      className="auth__submit"
      variant="contained"
        onClick={() => {
          onLogin(email, password);
        }}>Login</Button>
       </div>
      
    </div>
      
  );
}
