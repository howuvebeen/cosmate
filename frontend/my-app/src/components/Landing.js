import React from "react";
import { Link } from "react-router-dom";
import ProductList from "./auth/ProductList.js";
import Events from "./auth/Events.js";
import Instagram from "./auth/Instagram.js";

const Landing = () => (
    <div>
        <div class="mt-5 pt-5 pl-5">
            <h1 class="text-md-left">Number One </h1>
            <h4 class="text-md-left">Cosmetic Information Aggregator</h4>

            <Link to="/" className="navbar-brand">Have Suggestions?</Link>
        </div>
        <div>
            <ProductList />
            <Events />
            <Instagram />
        </div>
    </div>
);

export default Landing;