import React, { useState } from "react";
import "./MainContent.css";

import FootballContext from "../../context/FootballContext";
import Standings from "../Standings/Standings";
import GoalStatistic from "../GoalStatistic/GoalStatistic";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fixtures from "../Fixtures/Fixtures";

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

const MainContent = props => {
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const renderTabDetail = context => {
    let { selectedTabValue } = context;
    if (selectedTabValue === 0) {
      return <Standings context={context} />;
    } else if (selectedTabValue === 1) {
      return <Fixtures context={context} />;
    } else if (selectedTabValue === 2) {
      return <GoalStatistic context={context} />;
    }
  };

  const { classes } = props;
  return (
    <FootballContext.Consumer>
      {context => (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={context.selectedTabValue}
              onChange={context.handleTabValueChange}
            >
              <LinkTab label="Standings" href="page1" />
              <LinkTab label="Fixtures" href="page2" />
              <LinkTab label="Goal Statistic" href="page3" />
            </Tabs>
          </AppBar>
          {context.selectedTabValue === 0 && renderTabDetail(context)}
          {context.selectedTabValue === 1 && renderTabDetail(context)}
          {context.selectedTabValue === 2 && renderTabDetail(context)}
        </div>
      )}
    </FootballContext.Consumer>
  );
};

export default withStyles(styles)(MainContent);
