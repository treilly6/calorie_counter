import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import JournalHome from './Components/MealJournal/JournalHome';
import APISearch from './Components/Search/APISearch';
import FoodItem from './Components/FoodItem/FoodItem';

function App() {
  return (
      <Router>
          <div className="App">
              <Route exact path="/" component={JournalHome} />
              <Route exact path="/search" component={APISearch} />
              <Route exact path="/item" component={FoodItem} />
          </div>
      </Router>

  );
}

export default App;
