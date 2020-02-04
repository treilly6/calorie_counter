import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { UserContext } from '../../context/UserContext';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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

  console.log("NAV BAR IMPORTANT SHIT HERE");
  console.log(user);

  const userLogOut = () => {
      console.log("Loigout function");
      axios.get('/api/user/logout')
        .then(res => {
            console.log("Result for the logout here");
            console.log(res.data);
            if(res.data.success) {
                setUser(null);
            }
        })
        .catch(err => console.log(err))
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {user ? (
              <React.Fragment>
                  <div>{user.username}</div>
                  <Button onClick={() => userLogOut()} color="inherit">Log out</Button>
              </React.Fragment>
          ) : (
              <React.Fragment>
                  <Button onClick={() => {window.location = "/login"}} color="inherit">Log in</Button>
                  <Button onClick={() => {window.location = "/signup"}} color="inherit">Sign up</Button>
              </React.Fragment>
          )}

        </Toolbar>
      </AppBar>
    </div>
  );
}
