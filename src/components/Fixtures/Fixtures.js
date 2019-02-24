import React, { Component } from "react";
import "./Fixtures.css";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});

class Fixtures extends Component {
  renderWeeksOptions = () => {
    const { currentLeagueCode } = this.props.context;
    let weeks;
    if (currentLeagueCode === "BL1") {
      weeks = 34;
    } else {
      weeks = 38;
    }
    let options = [];
    for (let i = 0; i < weeks; i++) {
      options.push(
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      );
    }
    return options;
  };

  renderWeekSelection() {
    const { classes, context } = this.props;
    return (
      <FormControl className={classes.margin}>
        <InputLabel
          htmlFor="age-customized-native-simple"
          className={classes.bootstrapFormLabel}
        >
          Week
        </InputLabel>
        <NativeSelect
          value={context.selectedWeek}
          onChange={context.handleMatchWeekChange}
          input={
            <BootstrapInput name="age" id="age-customized-native-simple" />
          }
        >
          {this.renderWeeksOptions()}
        </NativeSelect>
      </FormControl>
    );
  }

  renderStatus(status){
    switch(status){
        case "FINISHED":
            return "Completed";
            break;
        case "IN_PLAY":
            return "Live";
            break;
        case "SCHEDULED":
            return "Not Started Yet";
            break;
        case "POSTPONED":
            return "Postponed";
            break;
        default:
            return "";
    }
  }
  renderMatchResults() {
    const { fixtures } = this.props.context;
      return(
            <React.Fragment>
                {fixtures.map((match,i)=>
                    <div key={i} className={`${match.status} match-container`}>
                        <div className="match">
                            <div className="home-team">{match.homeTeam.name}</div>
                            <div className="score">{match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}</div>
                            <div className="away-team">{match.awayTeam.name}</div>
                            <div className="status">{this.renderStatus(match.status)}</div>
                        </div>
                    </div>
                )}
            </React.Fragment>
      )
  }
  render() {
    return (
      <div className="fixture-container">
        <div className="week-container">{this.renderWeekSelection()}</div>
        {this.renderMatchResults()}
      </div>
    );
  }
}

export default withStyles(styles)(Fixtures);
