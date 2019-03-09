import React from "react";
import "./Fixtures.css";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Spinner from "../Spinner/Spinner";

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

const Fixtures = props => {
  const renderWeeksOptions = () => {
    const { currentLeagueCode } = props.context;
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

  const renderWeekSelection = () => {
    const { classes, context } = props;
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
          {renderWeeksOptions()}
        </NativeSelect>
      </FormControl>
    );
  };

  const renderStatus = status => {
    switch (status) {
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
  };

  const renderMatchResults = () => {
    const { fixtures } = props.context;
    if (fixtures.length === 0) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          {fixtures.map((match, i) => (
            <div key={i} className={`${match.status} match-container`}>
              <div className="match">
                <div className="home-team">{match.homeTeam.name}</div>
                <div className="score">
                  {match.score.fullTime.homeTeam} -{" "}
                  {match.score.fullTime.awayTeam}
                </div>
                <div className="away-team">{match.awayTeam.name}</div>
                <div className="status">{renderStatus(match.status)}</div>
              </div>
            </div>
          ))}
        </React.Fragment>
      );
    }
  };

  return (
    <div className="fixture-container">
      <div className="week-container">{renderWeekSelection()}</div>
      {renderMatchResults()}
    </div>
  );
};

export default withStyles(styles)(Fixtures);
