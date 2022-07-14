import {updateSession} from './action';
import {firebaseApp} from '../../api/firebase'


export const updateSessionThunk=()=>(dispatch)=>{
    firebaseApp.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch(updateSession(user));
        } else {
          dispatch(updateSession(null));
        }
    })
}