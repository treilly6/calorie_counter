import React, {useState, useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './User.css';
import { Redirect } from 'react-router-dom';

export default function SignUp() {
    // set the state variables
    const [redirect, setRedirect ] = useState(null);
    const [formState, setFormState ] = useState({username : '', password : '', password2 : ''});
    const [apiMessage, setApiMessage] = useState(null);

    // set variables from the context
    const { user, setUser } = useContext(UserContext);

    // handle the changing inputs
    const changeInput = (e) => {
        console.log("CHANGIN TJE INPUT");
        const { name, value } = e.target;
        console.log("HERE NAME AND VAL ", name, value);
        setFormState(prevState => (
            {...prevState, [name] : value}
        ));
    }

    // handle the form submit
    const submit = (e) => {
        // prevent form submit
        e.preventDefault();

        // make an api call to the user login api route
        axios.post('/api/user/signup', formState)
            .then(res => {
                if(res.data.success && res.data.success.redirect) {
                    // set redirect, user and message variables
                    setRedirect(res.data.success.redirect);
                    setApiMessage(res.data.success.message);
                    setUser(res.data.success.user);
                } else {
                    console.log("SIGNUP FAILED");
                    // want to add in an error box here which can take the error message
                }
            })
            .catch(err => console.log(err));

        console.log("HERE THE STATE IN THE SUBMIT ");
        console.log(formState);
    }

    const errorMessage = (val, type) => {
        if(type === "password" && val.length < 5 && val.length > 0) {
            return "Password must be at least 5 characters";
        } else if ( type === "password2" && val !== formState.password) {
            return "Password does not match";
        }
        return "";
    }


    if(redirect) {
        return (
            <Redirect to={{
                pathname : redirect,
                state : {
                    message : apiMessage,
                }
            }} />
        )
    } else {
        return(
            <div className="form-cont">
                <div className="form-border">
                    <div>
                        <div className="form-header">Sign up</div>
                    </div>
                    <div>
                        <form onSubmit={submit}>
                            <div className="all-inputs-cont">
                                <div className="input-cont">
                                    <TextField id="outlined-basic" style={{width : "100%"}} variant="outlined" type="text" label="Username" name="username" value={formState.username} onChange={changeInput} />
                                </div>
                                <div className="input-cont">
                                    <TextField id="outlined-basic" style={{width : "100%"}} error={formState.password.length < 5 && formState.password.length > 0} helperText={errorMessage(formState.password, "password")} variant="outlined" type="password" label="Password" name="password" value={formState.password} onChange={changeInput} />
                                </div>
                                <div className="input-cont">
                                    <TextField id="outlined-basic" style={{width : "100%"}} error={formState.password !== formState.password2 && formState.password2.length > 0} helperText={errorMessage(formState.password2, "password2")} variant="outlined" type="password" label="Confirm Password" name="password2" value={formState.password2} onChange={changeInput} />
                                </div>
                                <div className="input-cont btn-cont">
                                    <Button className="btn-pop" type="submit" variant="contained" color="primary">Sign up</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
