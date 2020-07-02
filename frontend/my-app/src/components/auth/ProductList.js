import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getproductList } from "../../actions/authActions";
import { Link } from "react-router-dom";

class ProductList extends Component {

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
                    <div class="row justify-content-md-center">
                        {lproducts.slice(0,3).map((lproduct, rank) => (
                            <div class="m-3 card col-md-5">
                                <div class="m-5">
                                    <div>
                                        <p>{rank+1}</p>
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
                    <div class="justify-content-md-center">
                    {lproducts.slice(3).map((lproduct) => (
                        <div class="card m-3">
                            <div class="row m-3">
                                <div class="mr-4">
                                    <p>{lproduct.company}</p>
                                </div>
                                <div class="mr-4">
                                    {/* <Link to={`/skincare/${lproduct.category[0].toLowerCase()}/${lproduct.pk}/`}><h4>{lproduct.name}</h4></Link> */}
                                    <Link to={`/skincare/moisturizers/${lproduct.pk}/`}><h4>{lproduct.name}</h4></Link>
                                </div>
                                <div class="mr-4">
                                    {this.Star(lproduct.average_star)}
                                </div>
                                <div class="mr-4">
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
            <div>
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

export default connect(mapStateToProps, { getproductList } )( ProductList );