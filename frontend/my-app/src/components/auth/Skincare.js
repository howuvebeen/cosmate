import React from "react";
import { Link } from "react-router-dom";

const Skincare = () => (
    <div class="m-5 p-5 col-md-2">
        <Link to="/skincare/cleansers/" className="navbar-brand">Cleansers</Link>
        <Link to="/skincare/moisturizers/" className="navbar-brand">Moisturizers</Link>
        <Link to="/skincare/treatments/" className="navbar-brand">Treatments</Link>
        <Link to="/skincare/wellness/" className="navbar-brand">Wellness</Link>
        <Link to="/skincare/masks/" className="navbar-brand">Masks</Link>
        <Link to="/skincare/eyecare/" className="navbar-brand">Eye care</Link>
        <Link to="/skincare/suncare/" className="navbar-brand">Sun care</Link>
        <Link to="/skincare/lipcare/" className="navbar-brand">Lip care</Link>
    </div>
);

export default Skincare;