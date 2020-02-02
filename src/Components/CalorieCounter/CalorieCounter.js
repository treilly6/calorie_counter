import React from 'react';
import './CalorieCounter.css';

export default function CalorieCounter() {
    return (
        <div className="calorie-counter-cont">
            <div className="calorie-counter-header">Calories Remaining</div>
            <div className="calorie-counter-calc-cont">
                <div className="calorie-cont">
                    <div>2,000</div>
                    <div>Goal</div>
                </div>
                <div className="calorie-cont">-</div>
                <div className="calorie-cont">
                    <div>0</div>
                    <div>Food</div>
                </div>
                <div className="calorie-cont">=</div>
                <div className="calorie-cont">
                    <div>2,000</div>
                    <div>Remaining</div>
                </div>
            </div>
        </div>
    )
}
