import React, { Component } from "react";
import "./App.css";
import { NotificationContainer } from "react-notifications";
import { Route } from "react-router-dom";
import FootballContext from "../../context/FootballContext";
import FootballProvider from "../../context/FootballProvider";

import LeagueSelection from "../LeagueSelection/LeagueSelection";
import LeagueDetails from "../LeagueDetails/LeagueDetails";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LeagueSelection} />

      </div>
    );
  }
}

export default App;
