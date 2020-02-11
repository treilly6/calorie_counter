import React, { useContext } from  'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function ProtectedRoute({ component : Component, ...rest }) {
    console.log("HERE IS THE PROTECTED ROUTE ");
    console.log(Component);
    console.log(rest);

    const { user, setUser } = useContext(UserContext);

    return (
        <Route {...rest} render={(props) => (
            user
            ? <Component {...props} />
            : <Redirect to={{
                pathname : "/login",
                state : {
                    message : "Error : Login Required",
                }
            }}/>
        )}/>
    )
}
