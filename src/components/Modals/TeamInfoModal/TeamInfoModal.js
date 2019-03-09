import React, { useState, useEffect } from "react";
import "./TeamInfoModal.css";
import Modal from "@material-ui/core/Modal";
import PlayerInfoModal from "../PlayerInfoModal/PlayerInfoModal";
import { withStyles } from "@material-ui/core/styles";
import FootballService from "../../../services/FootballService";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

const TeamInfoModal = (props) =>{
  const [squad, setSquad] = useState([]);
  const [isPlayerInfoModalOpen, setIsPlayerInfoModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState({});
  const footballService = new FootballService();

  useEffect(()=>{
    const { teamId } = props;
    let teamInfo = footballService.getTeamInfo(teamId);
    teamInfo.then(data => {
      setSquad(data.data.squad);
    });
  },[]);

  const handleOpenPlayerInfoModal = player => {
    setIsPlayerInfoModalOpen(true);
    setCurrentPlayer(player);
  };

  const handleClosePlayerInfoModal = () => {
    setIsPlayerInfoModalOpen(false);
  };

  const squadClass = (position) => {
    switch (position) {
      case "Goalkeeper":
        return "player player-gk";
        break;
      case "Defender":
        return "player player-def";
        break;
      case "Midfielder":
        return "player player-mid";
        break;
      case "Attacker":
        return "player player-fw";
        break;
      default:
        return "player player-coach";
    }
  };

  const renderSquad = ()=> {
    return squad.map(player => (
      <div
        key={player.id}
        className={squadClass(player.position)}
        onClick={() => handleOpenPlayerInfoModal(player)}
      >
        <span>{player.position ? player.position : 'Coach'}-</span>
        <span>{player.name}</span>
      </div>
    ));
  };

  const renderPlayerInfoModal = () => {
    if (isPlayerInfoModalOpen) {
      return (
        <PlayerInfoModal
          isPlayerInfoModalOpen={isPlayerInfoModalOpen}
          player={currentPlayer}
          closePlayerInfoModal={handleClosePlayerInfoModal}
        />
      );
    } else {
      return <React.Fragment />;
    }
  };

    const { classes, isTeamInfoModalOpen } = props;
    return (
      <div>
        {renderPlayerInfoModal()}
        <Modal
          open={isTeamInfoModalOpen}
          onClose={props.closeTeamInfoModal}
        >
          <div
            style={getModalStyle()}
            className={classes.paper}
            id="team-info-modal"
          >
            <div className="header-info">
              <div>Squad</div>
              <div
                className="closeButton"
                onClick={props.closeTeamInfoModal}
              >
                X
              </div>
            </div>
            <div className="detail-info">{renderSquad()}</div>
          </div>
        </Modal>
      </div>
    );

}

export default withStyles(styles)(TeamInfoModal);
