import React, { Component } from "react";
import SortingProduct from "./SortingProduct.js";
import ProductList from "./ProductList.js";
import Ordering from "./Ordering.js";

class SkinCategory extends Component {
    render() {
        return (
            <div>
                <div class="mt-5 ml-3 mr-4 mb-3">
                    <h3>Moisturizers Ranking</h3>
                    <Ordering/>
                </div>
                <div class="d-flex flex-row">
                    <SortingProduct class="col-md-4"/>
                    <ProductList class="col-md-6"/>
                </div>
            </div>
        );
    } 
}

export default SkinCategory;