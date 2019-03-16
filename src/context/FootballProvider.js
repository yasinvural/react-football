import React, { useEffect, useState } from "react";
import FootballContext from "./FootballContext";
import FootballService from "../services/FootballService";

const footballService = new FootballService();

const FootballProvider = (props) => {
  const [currentLeagueCode,setCurrentLeagueCode] = useState(null);
  const [selectedTabValue,setSelectedTabValue] = useState(0);
  const [selectedWeek,setSelectedWeek] = useState(1);
  const [standings, setStandings] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [scorers, setScorers] = useState([]);

  useEffect(()=>{
    loadData();
  },[currentLeagueCode,selectedTabValue,selectedWeek])

  const loadData = () => {
    if (selectedTabValue === 0) {
      loadStandings();
    } else if (selectedTabValue === 1) {
      loadFixtures();
    } else if (selectedTabValue === 2) {
      loadGoalStatistic();
    }
  };

  const handleMatchWeekChange = event => {
    const selectedWeek = event.target.value;
    setSelectedWeek(selectedWeek);
    loadFixtures();
  };

  const handleTabValueChange = (event, value) => {
    if(value === selectedTabValue) return;

    setSelectedTabValue(value);
    loadData();
  };

  const setCurrentLeague = leagueCode => {
    if (currentLeagueCode !== leagueCode) {
      setCurrentLeagueCode(leagueCode);
    }
  };

  const loadFixtures = async () => {
    try {
      const fixtureResult = await footballService.getMatches(
        currentLeagueCode,
        selectedWeek
      );
      const fixtures = fixtureResult.data.matches;
      setFixtures(fixtures);
    } catch (err) {
      console.log(err);
    }
  };

  const loadStandings = async () => {
    try {
      if (currentLeagueCode) {
        const standingResult = await footballService.getStandings(
          currentLeagueCode
        );
        const standings = standingResult.data.standings[0].table;
        setStandings(standings);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadGoalStatistic = async () => {
    try {
      const goalStatisticResult = await footballService.getGoalStatistic(
        currentLeagueCode
      );
      const scorers = goalStatisticResult.data.scorers;
      setScorers(scorers);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FootballContext.Provider value={{
      currentLeagueCode:currentLeagueCode,
      selectedTabValue:selectedTabValue,
      selectedWeek:selectedWeek,
      standings:standings,
      fixtures:fixtures,
      scorers:scorers,
      handleMatchWeekChange:handleMatchWeekChange,
      handleTabValueChange:handleTabValueChange,
      setCurrentLeague:setCurrentLeague
    }}>
      {props.children}
    </FootballContext.Provider>
  );
}

export default FootballProvider;