import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddFood from './AddFood';
import './MealTypes.css';
import { Link } from 'react-router-dom';

export default function MealTable({ mealType, journalDate, foodData }) {
    // mealType specifies if meal was breakfast, lunch, dinner, or snacks
    // journalDate specifies the date user selected on journalHome.js

    console.log("HERE IS THE MEALTYPE AND THE DATE IN THE MEAL TABLE JS ", mealType, journalDate, foodData, "\n", "\n", "\n", "\n");

    // if there is food date return the table
    if(foodData.length > 0) {
        const totalCalories = foodData.reduce((acc, currElem) => {return acc + Number(currElem.calories)}, 0);
        return(
            <div className="table-cont">
                <TableContainer component={Paper}>
                    <div className="meal-type-header-cont">
                        <div style={{fontWeight : "bold"}}>{mealType}</div>
                        <div style={{fontWeight : "bold"}}>{totalCalories}</div>
                    </div>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Food</TableCell>
                                <TableCell align="center">Calories</TableCell>
                                <TableCell align="center">Fat&nbsp;(g)</TableCell>
                                <TableCell align="center">Carbs&nbsp;(g)</TableCell>
                                <TableCell className="protein-col" align="center">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foodData.map(food => (
                                <TableRow key={food.name}>
                                    <TableCell component="th" scope="row">
                                        <div>
                                            <div>{food.foodName}</div>
                                            <div style={{color : "#b3b3b3"}}>{food.servings} {(food.servings == 1 ? "Serving" : "Servings")}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">{food.calories}</TableCell>
                                    <TableCell align="center">{food.fat}</TableCell>
                                    <TableCell align="center">{food.carbs}</TableCell>
                                    <TableCell className="protein-col" align="center">{food.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Link className="add-food-link" to={{
                        pathname : "/search",
                        state : {
                            mealType : mealType.toLowerCase(),
                            journalDate : journalDate,
                        }

                    }}>
                        <AddFood />
                    </Link>
                </TableContainer>
            </div>
        )
    } else {
        const totalCalories = 0;
        return (
            <Paper>
                <div className = "table-cont">
                    <div className="meal-type-header-cont">
                        <div style={{fontWeight : "bold"}}>{mealType}</div>
                        <div style={{fontWeight : "bold"}}>{totalCalories}</div>
                    </div>
                    <Link className="add-food-link"
                        to={{
                            pathname : "/search",
                            state : {
                                mealType : mealType.toLowerCase(),
                                journalDate : journalDate,
                            }
                    }}>
                        <AddFood />
                    </Link>
                </div>
            </Paper>            
        )
    }
}
