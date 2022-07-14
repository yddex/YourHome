import {UPDATE_SESSION} from "./types"

export const updateSession = (session)=>{
    return { type: UPDATE_SESSION, payload: session}
}




