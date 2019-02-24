import React, { Component } from "react";
import FootballContext from "./FootballContext";
import FootballService from "../services/FootballService";

const footballService = new FootballService();

export default class FootballProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLeagueCode: null,
      selectedTabValue: 0,
      selectedWeek: 1,
      standings: [],
      fixtures: [],
      scorers: [],
      loadStandings: this.loadStandings,
      loadGoalStatistic: this.loadGoalStatistic,
      setCurrentLeague: this.setCurrentLeague,
      handleTabValueChange: this.handleTabValueChange,
      handleMatchWeekChange: this.handleMatchWeekChange
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentLeagueCode !== prevState.currentLeagueCode) {
      this.loadData();
    }
  }

  loadData = () => {
    let { selectedTabValue } = this.state;
    if (selectedTabValue === 0) {
      this.loadStandings();
    } else if (selectedTabValue === 1) {
      this.loadFixtures();
    } else if (selectedTabValue === 2) {
      this.loadGoalStatistic();
    }
  };

  handleMatchWeekChange = event => {
    const selectedWeek = event.target.value;
    this.setState(
      {
        selectedWeek
      },
      () => {
        this.loadFixtures();
      }
    );
  };

  handleTabValueChange = (event, value) => {
    this.setState(
      {
        selectedTabValue: value
      },
      () => {
        this.loadData();
      }
    );
  };

  setCurrentLeague = leagueCode => {
    const { currentLeagueCode } = this.state;
    if (currentLeagueCode !== leagueCode) {
      this.setState({
        currentLeagueCode: leagueCode
      });
    }
  };

  loadFixtures = () => {
    const { currentLeagueCode, selectedWeek } = this.state;
    const fixtureResult = footballService.getMatches(
      currentLeagueCode,
      selectedWeek
    );
    fixtureResult.then(data => {
      const fixtures = data.data.matches;
      this.setState({
        fixtures
      });
    });
  };

  loadStandings = () => {
    const { currentLeagueCode } = this.state;
    if (currentLeagueCode) {
      const standingResult = footballService.getStandings(currentLeagueCode);
      standingResult.then(data => {
        const standings = data.data.standings[0].table;
        this.setState({
          standings
        });
      });
    }
  };

  loadGoalStatistic = () => {
    const { currentLeagueCode } = this.state;
    const goalStatisticResult = footballService.getGoalStatistic(
      currentLeagueCode
    );
    goalStatisticResult.then(data => {
      const scorers = data.data.scorers;
      this.setState({
        scorers
      });
    });
  };

  render() {
    return (
      <FootballContext.Provider value={this.state}>
        {this.props.children}
      </FootballContext.Provider>
    );
  }
}
