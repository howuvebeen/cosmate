import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getproductList } from "../../actions/authActions";
import { Link } from "react-router-dom";

class TopProduct extends Component {

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

    renderProductList() {
        const lproducts  = this.props.lproduct;
    
        if (lproducts) {
            return (
                <div>
                    <h4>Top Products</h4>
                    <div class="row justify-content-md-left">
                        {lproducts.slice(0,6).map((lproduct, rank) => (
                            <div class="m-3 card col-md-3">
                                <div class="m-3 p-3">
                                    <div class="mr-1">
                                        <p>0{rank+1}</p>
                                        <p>{lproduct.company}</p>
                                        {/* <Link to={`/skincare/${lproduct.category[0].toLowerCase()}/${lproduct.pk}/`}><h4>{lproduct.name}</h4></Link> */}
                                        <Link to={`/skincare/moisturizers/${lproduct.pk}/`}><h4>{lproduct.name}</h4></Link>
                                    </div>
                                    <div>
                                        {this.Star(lproduct.average_star)}
                                        <p>{lproduct.average_star} ({lproduct.review_number})</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div class="mt-5 pt-5 pl-5">
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

export default connect(mapStateToProps, { getproductList } )( TopProduct );