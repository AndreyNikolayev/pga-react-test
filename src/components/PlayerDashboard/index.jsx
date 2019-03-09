import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { deletePlayer } from '../../state/actions';
import { getPlayers } from '../../state/selectors';
import { Link} from 'react-router-dom';
import './PlayerDashboard.css';

class PlayerDashboard extends Component {

  formatName(player) {
    return `${player.lastName}, ${player.firstName}`
  }

  renderRows() {
    const { players } = this.props;

    if (!players) {
      return null
    }

    const playerRows = Object.keys(players).map((playerKey) => {
      return (
        <tr onClick={() => this.goToDetails(playerKey)} className="player-row" key={playerKey}>
          <td>{this.formatName(players[playerKey])}</td>
          <td>{players[playerKey].score}</td>
          <td><i onClick={(e) => this.remove(e, playerKey)} className="material-icons delete-btn">delete</i></td>
        </tr>
      )
    })
    return playerRows
  }

  goToDetails(playerKey) {
    this.props.history.push(`edit/${playerKey}`)
  }

  remove(event, playerKey) {
    event.stopPropagation()
    const { deletePlayer } = this.props

    deletePlayer(playerKey)
  }

  render() {
    return (
      <div className="PlayerDashboard">
        <h3 className="left">Leaderboard</h3>
        <Link to="/edit" className="waves-effect waves-light btn right" style={{ marginTop: 40 }}>Add Player</Link>
        <table className="table striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    players: getPlayers(state)
  }
}
  
export default compose(
  withRouter,
  connect(mapStateToProps, {deletePlayer})
)(PlayerDashboard)