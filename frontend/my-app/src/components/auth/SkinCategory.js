import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getproductList } from "../../actions/authActions";
import { Link } from "react-router-dom";

class SkinCategory extends Component {

    static propTypes = {
        getproductList: PropTypes.func.isRequired,
        lproduct: PropTypes.object
    };

    componentWillMount() {
        this.props.getproductList();
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

    renderRanking(){
        return (
            <div>
                <h3>Moisturizers Ranking</h3>
                <div class="row m-4 mb-5">
                    <div>
                        <p class="mt-5 ml-4">Skin Type</p>
                        <div class="row ml-4 ">
                            <button className="btn btn-light mr-3">All</button>
                            <button className="btn btn-light mr-3">Dry</button>
                            <button className="btn btn-light mr-3">Oily</button>
                            <button className="btn btn-light mr-3">Neutral</button>
                            <button className="btn btn-light mr-3">Combinational</button>
                        </div>
                    </div>
                    <div>
                        <p class="mt-5 ml-4 ">Price Range</p>
                        <input class="row ml-4 input-lg"></input>
                    </div>
                    <div>
                        <p class="mt-5 ml-4">Sort By</p>
                        <select class="row ml-5">
                            <option className="btn btn-light mr-3" >Ranking</option>
                            <option className="btn btn-light mr-3">Number of Reviews</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    renderProductList() {
        const lproducts  = this.props.lproduct;

        if (lproducts) {
            return (
                <div class="row m-4">
                    {lproducts.map((lproduct) => (
                        <div class="m-4">
                            <div>
                                <p>{lproduct.company}</p>
                                <Link to={`/skincare/${lproduct.category[0].toLowerCase()}/${lproduct.pk}/`}><h4>{lproduct.name}</h4></Link>
                            </div>
                            <div>
                                {this.Star(lproduct.average_star)}
                                <p>{lproduct.average_star} ({lproduct.review_number})</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div class="d-flex flex-column align-items-rights m-3 p-3">
                {this.renderRanking()}
                {this.renderProductList()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lproduct: state.auth.lproduct
    }
}


export default connect(mapStateToProps, { getproductList } )( SkinCategory );