import React, {Component} from "react";
import { Notifs } from 'redux-notifications';

import Header from "./Header";
import MainContent from "./MainContent";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Notifs />
                <Header />
                <MainContent />
            </div>
        );
    }
}