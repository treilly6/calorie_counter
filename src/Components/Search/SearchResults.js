import React, { useState, useEffect } from 'react';

export default function SearchResults({ searchResults }) {
    console.log("HERE THE Search Results ", searchResults);
    // const searchResults = props.SearchResults;

    var resultNames = null;
    
    if(searchResults) {
        var resultNames = searchResults.map(item => {
            return(
                <div>{item.fields.item_name}</div>
            )
        });
    }


    return (
        <div>
            <div>
                <h1>HERE RESULTS</h1>
                <div>{resultNames}</div>
            </div>
        </div>
    )
}
