import React from "react";
import "./LeagueSelection.css";
import { leagues } from "../../const/index";

export default function LeagueSelection(props) {
  return (
    <React.Fragment>
      <h2>Select the league & See the details</h2>
      <div className="league-selection-container">
        {leagues.map(league => (
          <div
            className="league-card-container"
            key={league.id}
            onClick={() => props.history.push(`/league/${league.code}`)}
          >
            <div className="league-img">
              <img src={league.src} alt="" />
            </div>
            <div className="league-name">{league.name}</div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
