import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; 
import {profileReducer} from "./profile";
import {dialogsReducer} from "./dialogs";
import {messagesReducer} from './messages'
import {sessionReducer} from './session'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers(
    {
        profile:  profileReducer,
        dialogs:  dialogsReducer,
        messages: messagesReducer,
        session: sessionReducer
    }
)

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);