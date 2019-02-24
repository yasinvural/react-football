import React, { Component } from "react";
import "./GoalStatistic.css";
import GoalScorerCard from "../GoalScorerCard/GoalScorerCard";

export default class GoalStatistic extends Component {
    componentDidMount(){
        console.log(this.props.context.scorers);
    }

    render(){
        const {scorers} = this.props.context;
        if(scorers.length === 0){
            return(
                <div>goal statistic will be here.</div>
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