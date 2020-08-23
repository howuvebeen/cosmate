import React, { Component } from "react";
import Sorting from "./Sorting.js";
import ProductList from "./ProductList.js";
import SortingOrder from "./SortingOrder.js";

class SkinCategory extends Component {
    render() {
        return (
            <div>
                <div class="mt-5 ml-3 mr-4 mb-3">
                    <h3>Moisturizers Ranking</h3>
                    <SortingOrder/>
                </div>
                <div class="d-flex flex-row">
                    <Sorting class="col-md-4"/>
                    <ProductList class="col-md-6"/>
                </div>
            </div>
        );
    } 
}

export default SkinCategory;