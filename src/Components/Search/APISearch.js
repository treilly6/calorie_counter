import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchResults from './SearchResults';
import './Search.css';

class APISearch extends React.Component {
    state = {
        foodSearch : '',
        searchResults : null,
    }

    constructor(props){
        super(props);
        console.log("COMPONENT PROSPS ");
        console.log(props);
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
                // set the state to the returned hits from the api
                this.setState({searchResults : res.data.hits});
            })
            .catch(err => {
                console.log("THERE WAS AN ERROR ", err);
            })
    }

    changeInput = (e) => {
        // change the value in the state for the input
        console.log("GONNA CHANGE THE STATE");
        this.setState({ [e.target.name] : e.target.value });
        console.log(this.state);
    }

    render() {
        return(
            <div className="api-search-main-cont">
                <form onSubmit={this.submit} className="search-form-container">
                    <TextField id="outlined-basic" variant="outlined" type="text" label="Search Food Item" name="foodSearch" value={this.state.foodSearch} onChange={this.changeInput} />
                    <Button type="submit" variant="outlined" color="primary">Primary</Button>
                </form>
                <SearchResults searchResults={this.state.searchResults} />
            </div>
        )
    }
}

export default APISearch;
