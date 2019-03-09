import React from "react";
import "./PlayerInfoModal.css";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";

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

const PlayerInfoModal = props => {
  const { classes, player, isPlayerInfoModalOpen } = props;
  return (
    <div>
      <Modal open={isPlayerInfoModalOpen} onClose={props.closePlayerInfoModal}>
        <div
          style={getModalStyle()}
          className={classes.paper}
          id="player-info-modal"
        >
          <div className="header-info">
            <div>{player.name}</div>
            <div className="closeButton" onClick={props.closePlayerInfoModal}>
              X
            </div>
          </div>
          <div className="detail-info">
            <div>
              <span>Nationality</span>
              <span>{player.nationality}</span>
            </div>
            <div>
              <span>Position</span>
              <span>{player.position ? player.position : "Coach"}</span>
            </div>
            <div>
              <span>Birthday</span>
              <span>{new Date(player.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div>
              <span>Number</span>
              <span>{player.shirtNumber ? player.shirtNumber : "-"}</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withStyles(styles)(PlayerInfoModal);
