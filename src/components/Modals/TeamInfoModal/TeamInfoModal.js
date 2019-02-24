import React, { Component } from "react";
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

class TeamInfoModal extends Component {
  footballService = new FootballService();
  constructor(props) {
    super(props);
    this.state = {
      squad: [],
      isPlayerInfoModalOpen: false,
      currentPlayer: {}
    };
  }

  componentDidMount() {
    const { teamId } = this.props;
    let teamInfo = this.footballService.getTeamInfo(teamId);
    teamInfo.then(data => {
      this.setState({
        squad: data.data.squad
      });
    });
  }

  handleOpenPlayerInfoModal = player => {
    this.setState({
      isPlayerInfoModalOpen: true,
      currentPlayer: player
    });
  };

  handleClosePlayerInfoModal = () => {
    this.setState({
      isPlayerInfoModalOpen: false
    });
  };

  squadClass(position) {
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
  }

  renderSquad() {
    const { squad } = this.state;
    return squad.map(player => (
      <div
        key={player.id}
        className={this.squadClass(player.position)}
        onClick={() => this.handleOpenPlayerInfoModal(player)}
      >
        <span>{player.position ? player.position : 'Coach'}-</span>
        <span>{player.name}</span>
      </div>
    ));
  }

  renderPlayerInfoModal() {
    if (this.state.isPlayerInfoModalOpen) {
      return (
        <PlayerInfoModal
          isPlayerInfoModalOpen={this.state.isPlayerInfoModalOpen}
          player={this.state.currentPlayer}
          closePlayerInfoModal={this.handleClosePlayerInfoModal}
        />
      );
    } else {
      return <React.Fragment />;
    }
  }

  render() {
    const { classes, isTeamInfoModalOpen } = this.props;
    return (
      <div>
        {this.renderPlayerInfoModal()}
        <Modal
          open={isTeamInfoModalOpen}
          onClose={this.props.closeTeamInfoModal}
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
                onClick={this.props.closeTeamInfoModal}
              >
                X
              </div>
            </div>
            <div className="detail-info">{this.renderSquad()}</div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(TeamInfoModal);
