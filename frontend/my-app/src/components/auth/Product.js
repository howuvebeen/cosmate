import React, { Component } from "react";
import ProductInfo from "./ProductInfo.js";
import ReviewList from "./ReviewList.js";
import SortingReview from "./SortingReview.js";

class Product extends Component {
    render() {
        const UR = this.props;

        return (
            <div>
                <div>
                    <ProductInfo UR={UR}/>
                    <div class="d-flex flex-row">
                        <div class="col-md-4">
                            <SortingReview/>
                        </div>
                        <div class="col-md-8 mt-3">
                            <ReviewList UR={UR}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}

export default Product;