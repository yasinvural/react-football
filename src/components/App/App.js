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
        <FootballProvider>
        <NotificationContainer/>
          <Route exact path="/react-football" component={LeagueSelection} />
          <FootballContext.Consumer>
            {context => (
              <React.Fragment>
                <Route
                  path="/league"
                  render={props => (
                    <LeagueDetails context={context} {...props} />
                  )}
                />
              </React.Fragment>
            )}
          </FootballContext.Consumer>
        </FootballProvider>
      </div>
    );
  }
}

export default App;
