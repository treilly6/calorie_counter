import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

export default function ChangeCalorieGoal() {

    const [showInput, setShowInput] = useState(false);
    const [calorieGoal, setCalorieGoal] = useState('');
    const { user, setUser } = useContext(UserContext);

    // function for toggling the visibility of the input
    const toggleCalorieInput = () => {
        setShowInput(!showInput)
    }

    // handle the input change to also change the state
    const handleChange = (e) => {
        setCalorieGoal(e.target.value);
    }

    const submit = (e) => {
        // prevent the initial submit of the form
        e.preventDefault();
        axios.post('/api/user/calorieGoal', {calorieGoal})
            .then(res => {
                console.log("HERE IS THE RES", res);
                if(res.data.success) {
                    // set the updated user context item
                    setUser(res.data.success.user);
                    // hide the input
                    setShowInput(false);
                    // clear the calorie goal
                    setCalorieGoal('');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <div>
            <div style={{padding : "6px 0px"}}><span onClick={toggleCalorieInput} className="set-goal-span">Change Calorie Goal</span></div>
            <div className="calorie-goal-cont" style={{display : (showInput ? "block" : "none")}}>
                <form onSubmit={submit} className="calorie-goal-form">
                    <input type="number" className="form-input" onChange={handleChange} name="calorieGoal" value={calorieGoal} />
                    <button type="submit" className="form-btn">Set Goal</button>
                </form>
            </div>
        </div>
    )
}
