import { Navigate } from "react-router-dom";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {firebaseApp} from '../../api/firebase'
import {updateSessionThunk} from '../../store/session'

export function Logout(){
const dispatch = useDispatch();

useEffect(()=>{
    async function signOut(){
        try{
            await firebaseApp.auth().signOut();
            dispatch(updateSessionThunk());
        }catch(e){
            console.log(e);
        }
    }
    signOut()
},[])

return (
    <Navigate to='/' replace/>
)

}
