import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import './FoodItem.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

export default function FoodItem(props) {
    console.log("HERE IS THE PROPOS OF THE FOOD ITEM ");
    console.log(props);


    const foodData = props.location.state.foodItem;
    const journalDate = props.location.state.journalDate;

    const [numServings, setNumServings] = useState(1);
    const [calories, setCalories] = useState(foodData.fields.nf_calories);
    const [fat, setFat] = useState(foodData.fields.nf_total_fat);
    const [carbs, setCarbs] = useState(foodData.fields.nf_total_carbohydrate);
    const [protein, setProtein] = useState(foodData.fields.nf_protein);
    const [redirect, setRedirect ] = useState(false);

    const setNutrition = (servings) => {
        // used to set all the state nutritional info at once based on the servings
        setCalories(foodData.fields.nf_calories * servings);
        setFat(foodData.fields.nf_total_fat * servings);
        setCarbs(foodData.fields.nf_total_carbohydrate * servings);
        setProtein(foodData.fields.nf_protein * servings);
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
        setTimeout(() => {
            const redirectState = {
                journalDate : journalDate,
            }
            console.log(redirectState, "YEET");
            setRedirect(true);
        }, 5000)
    }

    if(redirect) {
        return (
            <Redirect to={{
                pathname : "/",
                state : {
                    redirectDate : journalDate,
                }
            }} />
        )
    } else {
        return (
            <Paper elevation={3} style={{marginTop : "15px"}}>
                <div className="food-item-header">
                    <div style={{padding:"0px 5px"}}>{foodData.fields.item_name}</div>
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
                    <Button type="submit" variant="outlined" color="primary" onClick={saveJournalData}>Add To Journal</Button>
                </div>
            </Paper>
        )
    }
}
