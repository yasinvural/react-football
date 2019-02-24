import logoPremierLeague from "../assets/logo_premier_league.png";
import logoBundesliga from "../assets/logo_bundesliga.png";
import logoLigue1 from "../assets/logo_ligue_1.png";
import logoSerieA from "../assets/logo_serie_a.png";
import logoLaLiga from "../assets/logo_laliga.png";

export const leagues = [
    { id: 1, name: "Premier League", country: "England", src: logoPremierLeague, code:'PL' },
    { id: 2, name: "Bundesliga", country: "Germany", src: logoBundesliga, code:'BL1' },
    { id: 3, name: "Ligue 1", country: "France", src: logoLigue1, code:'FL1' },
    { id: 4, name: "Serie A", country: "Italy", src: logoSerieA, code:'SA' },
    { id: 5, name: "La Liga", country: "Spain", src: logoLaLiga, code:'PD' }
  ];