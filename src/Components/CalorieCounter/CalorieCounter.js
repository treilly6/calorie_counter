import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './CalorieCounter.css';
import ChangeCalorieGoal from './ChangeCalorieGoal';

export default function CalorieCounter({ foodData }) {

    const { user, setUser } = useContext(UserContext);

    // find the total calories consumed for the day and round to the nearest tenth
    const totalCalories = Math.round(
        Object.keys(foodData).reduce((acc, currKey) => {
            return acc + foodData[currKey].reduce((acc2, currItem) => {
                    return acc2 + Number(currItem.calories)
            }, 0)
        }, 0)
    * 10) / 10;

    const remCalories = user.calorieGoal - totalCalories;

    return (
        <div className="calorie-counter-cont">
            <div className="calorie-counter-header">Calories Remaining</div>
            <div className="calorie-counter-calc-cont">
                <div className="calorie-cont">
                    <div>{user.calorieGoal}</div>
                    <div>Goal</div>
                </div>
                <div className="calorie-cont">-</div>
                <div className="calorie-cont">
                    <div>{totalCalories}</div>
                    <div>Food</div>
                </div>
                <div className="calorie-cont">=</div>
                <div className="calorie-cont">
                    <div style={{color : (remCalories > 0 ? "green" : "red")}}>{remCalories}</div>
                    <div>Remaining</div>
                </div>
            </div>
            <ChangeCalorieGoal />
        </div>
    )
}
