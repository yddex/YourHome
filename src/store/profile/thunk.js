import { setBaseProfileFB, editProfileFB, getProfileFB} from "../../api/profileFB";
import {updateProfile} from './action'
import { db } from "../../api/firebase";


//Установка базовых значений, используется при регистрации
export const setBaseProfileThunk = ()=>(dispatch, getState)=>{
    const state = getState();
    const user = state.session.session;
    const baseProfile = {name: "User", surname: "Surname", isVisibleInfo: true};

    setBaseProfileFB(user.uid, baseProfile);
    dispatch(updateProfile(baseProfile.name, baseProfile.surname, baseProfile.isVisibleInfo))
}

//Получение данных
export const getProfileFromFB = (userUID) => async (dispatch)=>{
    try{
        const snapshot = await getProfileFB(userUID);
        dispatch(updateProfile(snapshot.val()))
    }
    catch(error){
        console.log("ERR", error)
    }
    
}

//Изменение профиля 
export const editProfileThunk = (profile)=> (_,getState)=>{
    const state = getState();
    const user = state.session.session;
    editProfileFB(user.uid, profile);
}

//Отслеживание изменений данных профиля
export const initTrackingProfile =()=> (dispatch, getState)=>{
    const state = getState();
    const user = state.session.session;

    db.ref('profile').child(user.uid).on("value", () => {
        dispatch(getProfileFromFB(user.uid));
    });

    db.ref('profile').on("child_changed", () => {
        dispatch(getProfileFromFB(user.uid));
    });

}