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

export default function MealTable({ mealType, journalDate }) {
    // mealType specifies if meal was breakfast, lunch, dinner, or snacks
    // journalDate specifies the date user selected on journalHome.js

    console.log("HERE IS THE MEALTYPE AND THE DATE IN THE MEAL TABLE JS ", mealType, journalDate);

    const foodData = [
        {
            name : "Peanut Butter",
            calories : 180,
            carbs : 13,
            fat : 18,
            protein : 9,
        }
    ];

    // if there is food date return the table
    if(foodData.length > 0) {
        return(
            <div className="table-cont">
                <TableContainer component={Paper}>
                    <div className="meal-type-header-cont">
                        <div style={{fontWeight : "bold"}}>{mealType}</div>
                        <div style={{fontWeight : "bold"}}>Calories</div>
                    </div>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Food</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foodData.map(food => (
                                <TableRow key={food.name}>
                                    <TableCell component="th" scope="row">
                                    {food.name}
                                    </TableCell>
                                    <TableCell align="right">{food.calories}</TableCell>
                                    <TableCell align="right">{food.fat}</TableCell>
                                    <TableCell align="right">{food.carbs}</TableCell>
                                    <TableCell align="right">{food.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* need to add the date into the state of this link */}
                    <Link className="add-food-link" to={{
                        pathname : "/search",
                        state : {
                            mealType : mealType,
                            journalDate : journalDate,
                        }

                    }}>
                        <AddFood />
                    </Link>
                </TableContainer>
            </div>
        )
    } else {
        // if there is no food data do not return a table
        return (
            <div className = "table-cont">
                <div className="meal-type-header-cont">
                    <div style={{fontWeight : "bold"}}>{mealType}</div>
                    <div style={{fontWeight : "bold"}}>Calories</div>
                </div>
                <Link className="add-food-link"
                    to={{
                        pathname : "/search",
                        state : {
                            mealType : mealType,
                            journalDate : journalDate,
                        }
                }}>
                    <AddFood />
                </Link>
            </div>
        )
    }
}
