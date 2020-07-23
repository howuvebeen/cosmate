import React from "react";
import { Link } from "react-router-dom";
import TopProduct from "./auth/TopProduct.js";
import Events from "./auth/Events.js";
import Instagram from "./auth/Instagram.js";
import BannerSlider from "./auth/BannerSlider.js";

const Landing = () => (
    <div>
        <div class="mt-5 pt-5 pl-5 pb-5 mb-5">
            <BannerSlider />
        </div>
        <div>
            <TopProduct/>
            <Events />
            <Instagram />
        </div>
    </div>
);

export default Landing;