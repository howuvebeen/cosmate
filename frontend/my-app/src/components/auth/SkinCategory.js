import React, { Component } from "react";
import Sorting from "./Sorting.js";
import ProductList from "./ProductList.js";

class SkinCategory extends Component {
    render() {
        return (
            <div>
                <h3 class="mt-4 mb-5">Moisturizers Ranking</h3>
                <div class="d-flex flex-row">
                    <Sorting class="col-md-4"/>
                    <ProductList class="col-md-6"/>
                </div>
            </div>
        );
    } 
}

export default SkinCategory;