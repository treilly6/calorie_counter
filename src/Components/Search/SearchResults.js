import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Redirect, Link } from 'react-router-dom';

export default function SearchResults({ searchResults, journalDate }) {
    console.log("HERE THE Search Results ", searchResults, journalDate);
    // const searchResults = props.SearchResults;

    const [redirect, setRedirect] = useState(false);

    var resultNames = null;

    if(searchResults) {
        var resultNames = searchResults.map(item => {
            return(
                <div>{item.fields.item_name}</div>
            )
        });
    }

    if(searchResults.length === 0) {
        return (
            <div style={{marginTop : "10px"}}>
                <div style={{textAlign : "center", fontWeight:"bold", fontSize : "1.5em"}}>No Search Results</div>
            </div>
        )
    } else {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        {searchResults.map(food => (
                                <TableRow className="search-results-row">
                                        <TableCell scope="row" style={{height : "50px", position : "relative"}}>
                                            <div className="table-link-container">
                                                <Link className="food-item-link" to={{
                                                        pathname : "/item",
                                                        state : {
                                                            foodItem : food,
                                                            journalDate : journalDate
                                                        }
                                                    }}>
                                                    <span className="link-span">{food.fields.item_name}</span>
                                                </Link>
                                            </div>
                                        </TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}
