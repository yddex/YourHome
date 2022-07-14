import {UPDATE_NAME, UPDATE_SURNAME, CHANGE_VISIBLE, UPDATE_PROFILE} from "./types"

export const updateName = (newName)=>{
    return { type: UPDATE_NAME, payload: newName}
}

export const updateSurname = (newSurname)=>{
    return { type: UPDATE_SURNAME, payload: newSurname}
}

export const changeVisible = ()=>{
    return {type: CHANGE_VISIBLE}
}
export const updateProfile = (profile)=>{
    return {
        type: UPDATE_PROFILE, 
        payload: profile
    }   
}


