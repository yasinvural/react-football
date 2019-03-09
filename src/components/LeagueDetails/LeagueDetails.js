import React, { useState, useEffect } from "react";
import "./LeagueDetails.css";
import LeftMenu from "../LeftMenu/LeftMenu";
import MainContent from "../MainContent/MainContent";

const LeagueDetails = props => {
  const [currentLeague, setCurrentLeague] = useState("");
  useEffect(() => {
    let { pathname } = props.history.location;
    let leagueCode = pathname.split("/league/")[1];
    setCurrentLeague(leagueCode);
    debugger;
    props.context.setCurrentLeague(leagueCode);
  });

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
};

export default LeagueDetails;
