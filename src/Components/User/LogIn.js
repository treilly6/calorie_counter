import React, {useState, useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './User.css';
import { Redirect } from 'react-router-dom';

export default function LogIn() {
    const [redirect, setRedirect ] = useState(null);
    const [formState, setFormState ] = useState({username : '', password : ''});

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
        axios.post('/api/user/login', formState)
            .then(res => {
                console.log("HERE IS THE LOGIN POST RESILT")
                console.log(res.data)
                if(res.data.success) {
                    // user was authenticted
                    setUser(res.data.success.user);
                    setRedirect(res.data.success.redirect);
                } else {
                    // user was not authenticated
                    // want to add in a message state variable that will render a messgage box
                    // setMessage(res.data.failure.message)
                    return
                }
            })
            .catch(err => console.log(err));

        console.log("HERE THE STATE IN THE SUBMIT ");
        console.log(formState);
    }

    if(redirect) {
        return(
            <Redirect to={{
                pathname : redirect
            }} />
        )
    } else {
        return (
            <div className="form-cont">
                <div className="form-border">
                    <div>
                        <div className="form-header">Log in</div>
                    </div>
                    <div>
                        <form onSubmit={submit}>
                            <div className="all-inputs-cont">
                                <div className="input-cont">
                                    <TextField id="outlined-basic" style={{width : "100%"}} variant="outlined" type="text" label="Username" name="username" value={formState.username} onChange={changeInput} />
                                </div>
                                <div className="input-cont">
                                    <TextField id="outlined-basic" style={{width : "100%"}} variant="outlined" type="password" label="Password" name="password" value={formState.password} onChange={changeInput} />
                                </div>
                                <div className="input-cont btn-cont">
                                    <Button className="btn-pop" type="submit" variant="contained" color="primary">Log in</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
