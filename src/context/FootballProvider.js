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

  async loadFixtures() {
    const { currentLeagueCode, selectedWeek } = this.state;
    try {
      const fixtureResult = await footballService.getMatches(
        currentLeagueCode,
        selectedWeek
      );
      const fixtures = fixtureResult.data.matches;
      this.setState({
        fixtures
      });
    } catch (err) {
      console.log(err);
    }
  }

  async loadStandings() {
    const { currentLeagueCode } = this.state;
    try {
      if (currentLeagueCode) {
        const standingResult = await footballService.getStandings(
          currentLeagueCode
        );
        const standings = standingResult.data.standings[0].table;
        this.setState({
          standings
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async loadGoalStatistic() {
    const { currentLeagueCode } = this.state;
    try {
      const goalStatisticResult = await footballService.getGoalStatistic(
        currentLeagueCode
      );
      const scorers = goalStatisticResult.data.scorers;
      this.setState({ scorers });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <FootballContext.Provider value={this.state}>
        {this.props.children}
      </FootballContext.Provider>
    );
  }
}
