import React, {Component} from "react";
import "./GoalScorerCard.css";
import PlayerInfoModal from "../Modals/PlayerInfoModal/PlayerInfoModal";

export default class GoalScorerCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            isPlayerInfoModalOpen:false
        };
    }

    handleOpenPlayerInfoModal = () =>{
        this.setState({
            isPlayerInfoModalOpen:true
        });
    }

    handleClosePlayerInfoModal = () =>{
        this.setState({
            isPlayerInfoModalOpen:false
        });
    }

    renderPlayerInfoModal(){
        if(this.state.isPlayerInfoModalOpen){
            return(
                <PlayerInfoModal 
                isPlayerInfoModalOpen={this.state.isPlayerInfoModalOpen} 
                player={this.props.player}
                closePlayerInfoModal={this.handleClosePlayerInfoModal}/>
            )
        }else{
            return(<React.Fragment/>)
        }
    }

    render(){
        return(
            <React.Fragment>
            <div className="goal-scorer-card">
              <div className="sorting-number">{this.props.index}</div>
              <div className="name-informations">
                <span className="player-name" onClick={this.handleOpenPlayerInfoModal}>
                    {this.props.player.name}
                </span>
                <span>{this.props.team.name}</span>
              </div>
              <div className="score-information">
                <span>{this.props.numberOfGoals}</span>
              </div>
            </div>
            {this.renderPlayerInfoModal()}
          </React.Fragment>
        )
    }
}

/*
export default function GoalScorerCard(props) {
    
  return (
    <React.Fragment>
      <div className="goal-scorer-card">
        <div className="sorting-number">{props.index}</div>
        <div className="name-informations">
          <span className="player-name">{props.player.name}</span>
          <span>{props.team.name}</span>
        </div>
        <div className="score-information">
          <span>{props.numberOfGoals}</span>
        </div>
      </div>
      <PlayerInfoModal />
    </React.Fragment>
  );
}
*/