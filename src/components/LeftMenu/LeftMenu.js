import React from "react";
import "./LeftMenu.css";
import { Link } from "react-router-dom";
import { leagues } from "../../const/index";

export default function LeftMenu(props) {
  return (
    <div className="left-menu-container">
      {leagues.map(league => (
        <Link key={league.id} to={league.code}>
          <div
            className={`league-card-container ${props.selectedLeague === league.code ? "selected" : ""}`}
            key={league.id}>
            <div className="league-img">
              <img src={league.src} alt="" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
