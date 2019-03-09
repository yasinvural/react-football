import React from "react";
import "./GoalStatistic.css";
import GoalScorerCard from "../GoalScorerCard/GoalScorerCard";
import Spinner from "../Spinner/Spinner";

const GoalStatistic = props => {
  const { scorers } = props.context;
  if (scorers.length == 0) {
    return <Spinner />;
  } else {
    return (
      <div className="goal-scorer-card-container">
        {scorers.map((scorer, i) => (
          <GoalScorerCard
            key={scorer.player.id}
            index={i + 1}
            numberOfGoals={scorer.numberOfGoals}
            player={scorer.player}
            team={scorer.team}
          />
        ))}
      </div>
    );
  }
};

export default GoalStatistic;
