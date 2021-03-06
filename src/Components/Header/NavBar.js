import React, { useContext, useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { UserContext } from '../../context/UserContext';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import NavDropDown from './NavDropDown';
import './Header.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position : "relative",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {

  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);

  // initalize the dropdown ref as state
  const [navDown, setNavDown] = useState(false);

  const [redirect, setRedirect] = useState(null);

  const currentPath = () => {
      console.log("Here is the current url");
      console.log(window.location.pathname);
      return window.location.pathname;
  }

  const userLogOut = () => {
      console.log("Loigout function");
      axios.get('/api/user/logout')
        .then(res => {
            console.log("Result for the logout here");
            console.log(res.data);
            if(res.data.success) {
                // redirect to the homepage
                window.location = res.data.redirect;
            }
        })
        .catch(err => console.log(err))
  }

  // get the url of the current page
  const urlPathname = currentPath();

  // changes the nav down state variable which is passed to the dropdown menu
  const toggleMenu = () => {
      // change the state of the nav drop down status
      // (true would mean dropdown is down and false is it is hidden/up)
      setNavDown(!navDown);
  }

  console.log("HERE IS THE URL BEFORE THE RETURN ", urlPathname);

  if(urlPathname === "/") {
      return (
        <div className={classes.root} style={{position : "absolute", zIndex : 5, width:"100%"}}>
          <AppBar position="static" style={{backgroundColor : "transparent", boxShadow : "none"}}>
            <Toolbar>
              <IconButton onClick={toggleMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Calorie Counter
              </Typography>
              {user ? (
                  <div className="flex-col">
                      <div style={{textAlign : "center"}}>{user.username}</div>
                      <Button onClick={() => userLogOut()} color="inherit">Log out</Button>
                  </div>
              ) : (
                  <div className="flex-col">
                      <Button onClick={() => {window.location = "/login"}} color="inherit">Log in</Button>
                      <Button onClick={() => {window.location = "/signup"}} color="inherit">Sign up</Button>
                  </div>
              )}
            </Toolbar>
          </AppBar>
          <NavDropDown navDown={navDown} setNavDown={setNavDown} />
        </div>
      );
  } else {
      return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton onClick={toggleMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Calorie Counter
                </Typography>
                {user ? (
                    <div className="flex-col">
                        <div style={{textAlign : "center"}}>{user.username}</div>
                        <Button onClick={() => userLogOut()} color="inherit">Log out</Button>
                    </div>
                ) : (
                    <div className="flex-col">
                        <Button onClick={() => {window.location = "/login"}} color="inherit">Log in</Button>
                        <Button onClick={() => {window.location = "/signup"}} color="inherit">Sign up</Button>
                    </div>
                )}
              </Toolbar>
            </AppBar>
            <NavDropDown navDown={navDown} setNavDown={setNavDown} />
          </div>
        );
  }


}
