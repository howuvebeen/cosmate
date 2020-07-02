import React, { Component } from "react";
import SearchEngine from "./SearchEngine.js";
import SearchResult from "./SearchResult.js";

class Search extends Component {
    render() {
        const UR = this.props;

        return (
            <div>
                <div>
                    <SearchEngine UR={UR}/>
                    <SearchResult UR={UR}/>
                </div>
            </div>
        );
    } 
}

export default Search;