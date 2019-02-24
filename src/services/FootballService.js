import {get} from './BaseService';
const BASEURL = "http://api.football-data.org/v2/";

export default class FootballService{

    getStandings(currentLeague){
        const url = `${BASEURL}competitions/${currentLeague}/standings`;
        return get(url);
    }

    getGoalStatistic(currentLeague){
        const url = `${BASEURL}competitions/${currentLeague}/scorers`;
        return get(url); 
    }

    getPlayerInfo(playerId){
        const url = `${BASEURL}players/${playerId}`;
        return get(url);
    }

    getTeamInfo(teamId){
        const url = `${BASEURL}teams/${teamId}`;
        return get(url);
    }

    getMatches(currentLeague,week){
        const url = `${BASEURL}competitions/${currentLeague}/matches?matchday=${week}`;
        return get(url);
    }
}