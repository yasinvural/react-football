import React, { Component } from "react";
import "./LeftMenu.css";
import { Link } from "react-router-dom";
import { leagues } from "../../const/index";
import { SwipeableDrawer } from "@material-ui/core";

/*
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
      <div className="league-drawer">Open Drawer</div>
    </div>
  );
}
*/

export default class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false
    };

  }

  toggleDrawer = () => {
    this.setState({
      top: !this.state.top
    });
  };

  drawerClick = () =>{
    this.toggleDrawer();
  };

  renderLeagueList = ()=>{
    const { selectedLeague } = this.props;

    return(
      leagues.map(league => (
        <Link key={league.id} to={league.code}>
          <div
            className={`league-card-container ${selectedLeague === league.code ? "selected" : ""}`}
            key={league.id}>
            <div className="league-img">
              <img src={league.src} alt="" />
            </div>
          </div>
        </Link>
      ))
    )
  };

  render() {
    const { top } = this.state;
    return (
      <React.Fragment>
        <div className="left-menu-container">
          {this.renderLeagueList()}
          <div className="league-drawer" onClick={this.toggleDrawer}><i className="fa fa-bars fa-2x"></i></div>
        </div>
        <SwipeableDrawer anchor="top" open={top} onClose={this.toggleDrawer} onOpen={this.toggleDrawer}>
          <div className="drawer-container" onClick={this.drawerClick}>
          {this.renderLeagueList()}  
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    )
  }
}