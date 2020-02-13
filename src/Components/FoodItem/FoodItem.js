import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Paper from '@material-ui/core/Paper';
import './FoodItem.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function FoodItem(props) {
    console.log("HERE IS THE PROPOS OF THE FOOD ITEM ");
    console.log(props);

    // get the context from the context provider
    const { user } = useContext(UserContext);


    const foodData = props.location.state.foodItem;
    const journalDate = props.location.state.journalDate;
    const foodName = foodData.fields.item_name;
    const mealType = props.location.state.mealType;

    // set the states for nutrition to the incoming foodData rounded to 1 decimal place
    const [numServings, setNumServings] = useState(1);
    const [calories, setCalories] = useState(Math.round(foodData.fields.nf_calories * 10) / 10);
    const [fat, setFat] = useState(Math.round(foodData.fields.nf_total_fat * 10) / 10);
    const [carbs, setCarbs] = useState(Math.round(foodData.fields.nf_total_carbohydrate * 10) / 10);
    const [protein, setProtein] = useState(Math.round(foodData.fields.nf_protein * 10) / 10);
    const [redirect, setRedirect ] = useState(false);

    const setNutrition = (servings) => {
        // used to set all the state nutritional info at once based on the servings
        // rounded to 1 decimal place
        setCalories(Math.round(foodData.fields.nf_calories * servings * 10) / 10);
        setFat(Math.round(foodData.fields.nf_total_fat * servings * 10) / 10);
        setCarbs(Math.round(foodData.fields.nf_total_carbohydrate * servings * 10) / 10);
        setProtein(Math.round(foodData.fields.nf_protein * servings * 10) / 10);
    }

    // handle the chaneges to the number of servings input
    const handleChange = (e) => {
        console.log(e.target);
        console.log(e.target.value);
        if(e.target.value < 0) {
            setNumServings(0);
            setNutrition(0)
        } else {
            setNumServings(e.target.value);
            setNutrition(e.target.value)
        }
    }

    // when user saves the journal data i.e clicks button at bottom of page
    // once there is a db setup this will post date to the db thru api and if successful
    // redirect back to the journalHome.js
    const saveJournalData = () => {
        // if invalid num servigs retun null
        if(numServings === 0) {
            return
        }

        // make the food item obj containing all the food data
        // this uses shorthand syntax for object creation where
        // since key and value are the same it can be listed once
        const foodItemObj = {
            servings : numServings,
            calories,
            fat,
            carbs,
            protein,
            journalDate,
            foodName,
            username : user.username,
            mealType,
        }

        axios.post('/api/foodItems/newItem', foodItemObj)
            .then(res => {
                console.log("HERE IS THE RESULT ");
                console.log(res.data);
                // if successful request set redirect to true
                if(res.data.success) {
                    setRedirect(true);
                }
            })
            .catch(err => console.log(err));
    }

    if(redirect) {
        return (
            <Redirect to={{
                pathname : "/journal",
                state : {
                    redirectDate : journalDate,
                }
            }} />
        )
    } else {
        return (
            <Paper elevation={3}>
                <div className="food-item-header">
                    <div style={{padding:"0px 5px"}}>{foodName}</div>
                </div>
                <div className="nutrition-body">
                    <div className="nutrition-header" >Nutritional Info</div>
                    <div className="servings-counter">
                        <TextField
                            id="outlined-number"
                            label="Number of Servings"
                            type="number"
                            value={numServings}
                            onChange={handleChange}
                            className = "food-item-servings-input"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <div style={{display : (numServings < 1 ? "block" : "none") }}>
                            <div style={{color : "#ff0000"}}>* Servings cannot be zero</div>
                        </div>
                    </div>
                    <div className="nutrition-info-cont">
                        <div>Calories</div>
                        <div>{calories}</div>
                    </div>
                    <div className="nutrition-info-cont">
                        <div>Fat</div>
                        <div>{fat}</div>
                    </div>
                    <div className="nutrition-info-cont">
                        <div>Carbs</div>
                        <div>{carbs}</div>
                    </div>
                    <div className="nutrition-info-cont">
                        <div>Protein</div>
                        <div>{protein}</div>
                    </div>
                </div>
                <div className="button-cont">
                    <Button className="btn-pop" disabled={numServings < 1} type="submit" variant="contained" color="primary" onClick={saveJournalData}>Add To Journal</Button>
                </div>
            </Paper>
        )
    }
}
