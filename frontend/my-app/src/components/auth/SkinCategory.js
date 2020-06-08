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

    renderProductList() {
        const lproducts  = this.props.lproduct;

        if (lproducts) {
            return (
                <div class="row p-3">
                    {lproducts.map((lproduct) => (
                        <div class="p-5">
                            <div>
                                <p>{lproduct.company}</p>
                                <Link to={`/skincare/${lproduct.category[0].toLowerCase()}/${lproduct.pk}/`}><h4>{lproduct.name}</h4></Link>
                            </div>
                            <div>
                                {this.Star(lproduct.average_star)}
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
            <div class="d-flex flex-column align-items-center p-3">
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