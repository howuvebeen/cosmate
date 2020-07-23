import "bootstrap/dist/css/bootstrap.css";
import 'redux-notifications/lib/styles.css';
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import history from "./utils/historyUtils";
import { authLogin, getUserInfo} from "./actions/authActions";
import App from "./components/App";

import "./css/base.css";
// import "./css/bootstrap.css";
// import "./css/bootstrap-theme.css";
// import "./css/xeicon.css";
// import "./css/font.css";
// import "./css/layout.css";
// import "./css/menu.css";
import "./css/slick.css";
// import "./css/slick-theme.css";
import "./css/main.css";
// import "./css/jquery-ui.css";

const token = localStorage.getItem("token");

if (token) {
    store.dispatch(authLogin(token));
    store.dispatch(getUserInfo(token));
}

ReactDOM.render(
    <Provider store={store} key="provider">
        <Router history={history}>
            <App />
        </Router>
    </Provider>
, document.getElementById("root"));