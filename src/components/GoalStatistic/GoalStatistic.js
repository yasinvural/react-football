import React, { Component } from "react";
import "./GoalStatistic.css";
import GoalScorerCard from "../GoalScorerCard/GoalScorerCard";
import Spinner from "../Spinner/Spinner";

export default class GoalStatistic extends Component {
    render(){
        const {scorers} = this.props.context;
        if(scorers.length == 0){
            return(
                <Spinner/>
            )
        }else{
            return(
                <div className="goal-scorer-card-container">
                    {scorers.map((scorer,i)=>
                            <GoalScorerCard
                            key={scorer.player.id}  
                                index={i+1}
                                numberOfGoals={scorer.numberOfGoals}
                                player={scorer.player}
                                team={scorer.team}
                            />
                    )}
                </div>
            )
        }
        
    }
}