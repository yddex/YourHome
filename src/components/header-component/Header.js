import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import {AppBar, Toolbar, Button, Menu, MenuItem, Fade} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import './header.scss'
import { useState } from 'react';

const theme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
              boxShadow: "none",
              backgroundColor: "#fff",
              borderBottom: "1px solid #d5cece", 
              flexDirection: "row",
              justifyContent: "space-between"
           }
      },
      }
    }
  });


const links = {

    public: [ 
    {title: "Home", path: '/YourHome'},
    ],

    auth:[ 
    {title: "Chats", path: '/chats'},
    {title: "Profile", path: '/profile'},
    {title: "LogOut", path: '/logout'}
],

    notAuth: [
    {title: "Login", path: '/login'},
    {title: "SignUp", path: '/signup'}]
    
}

function Header(){
    const session = useSelector((state)=>(state.session.session));
   const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth)
  
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const changeWidth = ()=>{
        setWindowWidth(document.documentElement.clientWidth)
    }

    const handleClick = (event) => {
    setAnchor(event.currentTarget);
    };
    const handleClose = () => {
    setAnchor(null);
    };

    window.onresize = changeWidth;
    return (
    <ThemeProvider theme={theme}>
       {windowWidth > 630 && <AppBar position="static">
           <Toolbar 
           className="left">
               {links.public.map((link, i)=>{
                   return <Button key={i}>
                       <Link to={link.path} className="nav__link">
                       {link.title}
                       </Link>
                   </Button>
               })}
           </Toolbar>
           <Toolbar className="right">
               {!!session && links.auth.map((link, i)=>{
                   return <Button key={i}>
                       <Link to={link.path} className="nav__link">
                       {link.title}
                       </Link>
                   </Button>
               })}
               {!session && links.notAuth.map((link, i)=>{
                   return <Button key={i}>
                       <Link to={link.path} className="nav__link">
                       {link.title}
                       </Link>
                   </Button>
               })}
           </Toolbar>
        </AppBar>}
        {windowWidth < 631 && <AppBar position="static">
        <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        ><MenuIcon className="menu-icon"/></Button>
            <Menu
             id="fade-menu"
             MenuListProps={{
               'aria-labelledby': 'fade-button',
             }}
             anchorEl={anchor}
             open={open}
             onClose={handleClose}
             TransitionComponent={Fade}>
               {links.public.map((link, i)=>{
                   return <MenuItem key={i} onClick={handleClose}>
                       <Link to={link.path} className="nav__link">
                       {link.title}
                       </Link>
                   </MenuItem>
               })}
               {!!session && links.auth.map((link, i)=>{
                   return <MenuItem key={i} onClick={handleClose}>
                       <Link to={link.path} className="nav__link">
                       {link.title}
                       </Link>
                   </MenuItem>
               })}
               {!session && links.notAuth.map((link, i)=>{
                   return <MenuItem key={i} onClick={handleClose}>
                       <Link to={link.path} className="nav__link">
                       {link.title}
                       </Link>
                   </MenuItem>
               })}
            </Menu>
        </AppBar>}


        </ThemeProvider>
    )
}

export default Header;