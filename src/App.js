import React, {useEffect, useState} from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import JournalHome from './Components/MealJournal/JournalHome';
import APISearch from './Components/Search/APISearch';
import FoodItem from './Components/FoodItem/FoodItem';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Paper from '@material-ui/core/Paper';
import LandingPage from './Components/HomePage/LandingPage';
import LogIn from './Components/User/LogIn';
import SignUp from './Components/User/SignUp';
import { UserContext } from './context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import MessageBox from './Components/Messages/MessageBox.js';

function App() {
    // user that is passed to the user context
    const [user, setUser] = useState(null);

    // userId whcih is used as a dependency in the useEffect function below
    // I did this becasue if an object is used in the dependency the UseEffect
    // ran in an infinite loop
    const [userId, setUserId] = useState(null);

    // variable to check if the user data was fetched yet
    // used to prevent render unless data fetched
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        console.log("USE EFFECT IS CALLED")
        console.log("User before the axios call ", user);
        axios.get('/api/user/auth')
            .then(res => {
                console.log("HERE IS FULL RES ", res);
                console.log("HERE IS THE DATA ", res.data.auth);
                if(res.data.auth) {
                    setUser(res.data.auth);
                    setUserId(res.data.auth._id);
                } else {
                    setUser(null);
                    setUserId(null);
                }
                setDataFetched(true);

            })
            .catch(err => console.log(err));
    }, [userId]);

    if(dataFetched) {
        return (
            <Router>
                <div className="App">
                    <UserContext.Provider value={{ user, setUser }}>
                        <Header />
                        <Paper elevation={2}>
                            <Route exact path="/" component={LandingPage} />
                            <Route exact path="/login" component={LogIn} />
                            <Route exact path="/signup" component={SignUp} />
                            <div className="main-content-container">
                                <ProtectedRoute exact path="/journal" component={JournalHome} />
                                <ProtectedRoute exact path="/search" component={APISearch} />
                                <ProtectedRoute exact path="/item" component={FoodItem} />
                            </div>
                        </Paper>
                    </UserContext.Provider>
                  <Footer />
                </div>
            </Router>

        );
    } else {
        return null;
    }
}

export default App;
