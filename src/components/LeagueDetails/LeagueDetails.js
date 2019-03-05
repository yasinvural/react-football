import React, { Component } from "react";
import "./LeagueDetails.css";
import LeftMenu from "../LeftMenu/LeftMenu";
import MainContent from "../MainContent/MainContent";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLeague: ""
    };
  }

  componentDidMount() {
    let { pathname } = this.props.history.location;
    let leagueCode = pathname.split("/league/")[1];

    this.setState({
      currentLeague: leagueCode
    });
    this.props.context.setCurrentLeague(leagueCode);
  }

  static getDerivedStateFromProps(props, state) {
    let { pathname } = props.history.location;
    let leagueCode = pathname.split("/league/")[1];

    if (leagueCode !== state.currentLeague) {
      props.context.setCurrentLeague(leagueCode);
      return {
        currentLeague: leagueCode
      };
    }
    return null;
  }

  render() {
    let { currentLeague } = this.state;
    return (
      <div className="league-detail-container">
        <div className="left-menu-content">
          <LeftMenu selectedLeague={currentLeague} />
        </div>
        <div className="main-content">
          <MainContent />
        </div>
      </div>
    );
  }
}
