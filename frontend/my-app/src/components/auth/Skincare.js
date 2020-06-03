import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getproductList } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Skincare extends Component {

    static propTypes = {
        getproductList: PropTypes.func.isRequired,
        product: PropTypes.object
    };

    componentWillMount() {
        this.props.getproductList();
    }

    renderProductList() {
        const products  = this.props.product;
        
        if (products) {
            return (
                <div class="row p-3">
                    {products.map(product => (
                        <div class="p-5">
                            <div>
                                <p>{product.company}</p>                               
                                <Link to={`/skincare/${product.pk}`}><h4>{product.name}</h4></Link>
                            </div>
                            <div>
                                {product.average_star}
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
        product: state.auth.product
    }

}

export default connect(mapStateToProps, { getproductList } )( Skincare );