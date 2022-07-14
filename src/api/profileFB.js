import {db} from './firebase'
export const setBaseProfileFB=(userUID, profile)=>{
    return db.ref('profile').child(userUID).set(profile);
}

export const editProfileFB = (userUID, profile)=>{
    return db.ref('profile').child(userUID).set(profile);
}

export const getProfileFB = (userUID)=>{
    return db.ref('profile').child(userUID).get();
}