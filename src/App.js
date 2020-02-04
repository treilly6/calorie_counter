import React from 'react';
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

function App() {
  return (
      <Router>
          <div className="App">
              <Header />
              <Paper elevation={2}>
                  <Route exact path="/lp" component={LandingPage} />
                  <Route exact path="/login" component={LogIn} />
                  <Route exact path="/signup" component={SignUp} />
                  <div className="main-content-container">
                      <Route exact path="/" component={JournalHome} />
                      <Route exact path="/search" component={APISearch} />
                      <Route exact path="/item" component={FoodItem} />
                  </div>
              </Paper>
              <Footer />
          </div>
      </Router>

  );
}

export default App;
