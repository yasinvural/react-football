import React, { useState } from "react";
import "./GoalScorerCard.css";
import PlayerInfoModal from "../Modals/PlayerInfoModal/PlayerInfoModal";

const GoalScorerCard = props => {
  const [isPlayerInfoModalOpen, setIsPlayerInfoModalOpen] = useState(false);

  const handleOpenPlayerInfoModal = () => {
    setIsPlayerInfoModalOpen(true);
  };

  const handleClosePlayerInfoModal = () => {
    setIsPlayerInfoModalOpen(false);
  };

  const renderPlayerInfoModal = () => {
    if (isPlayerInfoModalOpen) {
      return (
        <PlayerInfoModal
          isPlayerInfoModalOpen={isPlayerInfoModalOpen}
          player={props.player}
          closePlayerInfoModal={handleClosePlayerInfoModal}
        />
      );
    } else {
      return <React.Fragment />;
    }
  };

  return (
    <React.Fragment>
      <div className="goal-scorer-card">
        <div className="sorting-number">{props.index}</div>
        <div className="name-informations">
          <span className="player-name" onClick={handleOpenPlayerInfoModal}>
            {props.player.name}
          </span>
          <span>{props.team.name}</span>
        </div>
        <div className="score-information">
          <span>{props.numberOfGoals}</span>
        </div>
      </div>
      {renderPlayerInfoModal()}
    </React.Fragment>
  );
};

export default GoalScorerCard;
