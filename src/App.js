import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Header from "./components/header-component/Header"
import Home from "./components/home-component/Home";
import ChatPage from "./components/chat-page/ChatPage";
import Profile from "./components/profile-component/Profile";
import {SignUpPage, LoginPage, Logout} from './components/auth-components'
import {PublicRoute, PrivateRoute} from './components/route/routes'
import {updateSessionThunk} from './store/session'




function App() {
const session = useSelector((state)=>(state.session.session));
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(updateSessionThunk());
},[dispatch])
return ( 
  <div className = "App">
    <BrowserRouter>
       <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/YourHome" element={<Home/>}/>
            <Route path="/chats/*" element={<PrivateRoute session={session} to="/login"><ChatPage/></PrivateRoute>}/>
            <Route path="/profile" element={<PrivateRoute session={session} to="/login"><Profile/></PrivateRoute>}/>
            <Route path="/logout" element={<PrivateRoute session={session} to="/logout"><Logout/></PrivateRoute>}/>
            <Route path="/signup" element={<PublicRoute session={session} to="/profile"><SignUpPage/></PublicRoute>}/>
            <Route path="/login" element={<PublicRoute session={session} to='/profile'><LoginPage/></PublicRoute>}/>
            <Route path="/*" element={<Navigate to="/" replace={true} /> }/>
          </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;