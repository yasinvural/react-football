import React, { useState } from "react";
import "./Standings.css";

import TeamInfoModal from "../Modals/TeamInfoModal/TeamInfoModal";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Spinner from "../Spinner/Spinner";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  header: {
    cursor: "pointer"
  },
  img: {
    width: "50px"
  },
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1]
  }
});

const Standings = props => {
  const [isTeamInfoModalOpen, setIsTeamInfoModalOpen] = useState(false);
  const [teamId, setTeamId] = useState(null);

  const openTeamInfoModal = teamId => {
    setTeamId(teamId);
    setIsTeamInfoModalOpen(true);
  };

  const closeTeamInfoModal = () => {
    setIsTeamInfoModalOpen(false);
    setTeamId(null);
  };

  const renderTeamInfoModal = () => {
    if (isTeamInfoModalOpen) {
      return (
        <TeamInfoModal
          teamId={teamId}
          isTeamInfoModalOpen={isTeamInfoModalOpen}
          closeTeamInfoModal={closeTeamInfoModal}
        />
      );
    }
  };

  const { classes } = props;
  const { standings } = props.context;
  if (standings.length === 0) {
    return <Spinner />;
  } else {
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell>Club</TableCell>
                <TableCell>Won</TableCell>
                <TableCell>Drawn</TableCell>
                <TableCell>Lost</TableCell>
                <Tooltip title="Goals For" placement="top-start">
                  <TableCell className={classes.header}>GF</TableCell>
                </Tooltip>
                <Tooltip title="Goals Against" placement="top-start">
                  <TableCell className={classes.header}>GA</TableCell>
                </Tooltip>
                <Tooltip title="Goal Difference" placement="top-start">
                  <TableCell className={classes.header}>GD</TableCell>
                </Tooltip>
                <TableCell>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {standings.map(standing => (
                <TableRow key={standing.team.id}>
                  <TableCell scope="row">{standing.position}</TableCell>
                  <Tooltip
                    placement="top-end"
                    classes={{ tooltip: classes.lightTooltip }}
                    title={
                      <React.Fragment>
                        <span>
                          <img
                            className={classes.img}
                            src={standing.team.crestUrl}
                            alt=""
                          />
                        </span>
                      </React.Fragment>
                    }
                  >
                    <TableCell
                      className={classes.header}
                      onClick={() => openTeamInfoModal(standing.team.id)}
                    >
                      {standing.team.name}
                    </TableCell>
                  </Tooltip>
                  <TableCell>{standing.won}</TableCell>
                  <TableCell>{standing.draw}</TableCell>
                  <TableCell>{standing.lost}</TableCell>
                  <TableCell>{standing.goalsFor}</TableCell>
                  <TableCell>{standing.goalsAgainst}</TableCell>
                  <TableCell>{standing.goalDifference}</TableCell>
                  <TableCell>{standing.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {renderTeamInfoModal()}
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(Standings);
