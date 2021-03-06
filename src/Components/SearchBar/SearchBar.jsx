import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            term: '',
        };

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearchByPressEnter = this.handleSearchByPressEnter.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }

    //IF press enter the search button is activated
    handleSearchByPressEnter (e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            this.search();
        }
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange}
                onKeyDown={this.handleSearchByPressEnter} />
                <button className="SearchButton" 
                onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;