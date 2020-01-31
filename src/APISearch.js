import React from 'react';
import axios from 'axios';

class APISearch extends React.Component {
    state = {
        foodSearch : '',
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("api search is mounting");
    }

    submit = (e) => {
        e.preventDefault();

        const headers = {
            headers : {
                "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
        		"x-rapidapi-key": "fc1fcf1b20msh5379d339896f4cep14b55bjsn8cad082754a2"
            }
        }

        const reqURL = `https://nutritionix-api.p.rapidapi.com/v1_1/search/${this.state.foodSearch}?fields=*`;

        console.log("HERE IS THE REQUEST URL ", reqURL);

        // axios method wont return the proper fields
        axios.get(reqURL, headers)
            .then(res => {
                console.log("HERE IS THE RES ", res);
            })
            .catch(err => {
                console.log("THERE WAS AN ERROR ", err);
            })
    }

    changeInput = (e) => {
        // change the value in the state for the input
        this.setState({ [e.target.name] : e.target.value });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.submit}>
                    <input type="text" placeholder="Enter Food Item" name="foodSearch" value={this.state.foodSearch} onChange={this.changeInput} />
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default APISearch;
