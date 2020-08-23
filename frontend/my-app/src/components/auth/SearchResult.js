import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSearch } from "../../actions/authActions";
import { Link } from "react-router-dom";

class SearchResult extends Component {

    static propTypes = {
        getSearch: PropTypes.func.isRequired,
        search: PropTypes.object
    };

    componentWillMount() {
        this.props.getSearch(this.props.UR);
    }

    Tag(type) {
        if (type != null){
          var arrayLength = type.length;
          var result = "";
          for (var i = 0; i < arrayLength; i++) {
            if (type[i] == "O") {
              var result = result.concat("Oily");
            } else if (type[i] == "D") {
              var result = result.concat("Dry");
            } else {
              var result = result.concat("Combinational");
            }
            var result = result.concat(" ");
          }
          return result;
        };  
      }

    Star(star){
        if (star != null){
        if (star < 1){
          return "☆☆☆☆☆";
        } else if (star >=1 && star <2){
          return "★☆☆☆☆"
        } else if (star >=2 && star <3){
          return "★★☆☆☆"
        } else if (star >=3 && star <4){
          return "★★★☆☆"
        } else if (star >=4 && star <5){
          return "★★★★☆"
        } else {
          return "★★★★★"
        }
      }
    };

    renderNoResult(){
        return (
            <div class="text-center mt-5">
                <p>No Search Results</p>
            </div>
        );
    }

    renderYesResult(){
        const searchs  = this.props.search;

        return (
            <div class="row justify-content-md-center">
                {searchs.map((search) => (
                    <div class="col-md-3 card p-5 m-4">
                        <div>
                            <p>{search.company}</p>
                            <h4>{search.name}</h4>
                            <p>{this.Star(search.average_star)} {search.average_star} ({search.review_number})</p>
                            <p>{search.description}</p>
                            <p>{this.Tag(search.skintype)}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    renderProductList() {
        const searchs  = this.props.search;
    
        if (searchs) {
            if (searchs.length==0){
                return (
                    <div>
                        {this.renderNoResult()}
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.renderYesResult()}
                    </div>
                );
            }
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.renderProductList()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        search: state.auth.search
    }
}

export default connect(mapStateToProps, { getSearch } )( SearchResult );