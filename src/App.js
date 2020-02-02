import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import JournalHome from './Components/MealJournal/JournalHome';
import APISearch from './Components/Search/APISearch';
import FoodItem from './Components/FoodItem/FoodItem';
import Header from './Components/Header/Header';
import Paper from '@material-ui/core/Paper';
import LandingPage from './Components/HomePage/LandingPage';

function App() {
  return (
      <Router>
          <div className="App">
              <Header />
              <Paper elevation={2}>
                  <Route exact path="/lp" component={LandingPage} />
                  <div className="main-content-container">
                      <Route exact path="/" component={JournalHome} />
                      <Route exact path="/search" component={APISearch} />
                      <Route exact path="/item" component={FoodItem} />
                  </div>
              </Paper>
          </div>
      </Router>

  );
}

export default App;
