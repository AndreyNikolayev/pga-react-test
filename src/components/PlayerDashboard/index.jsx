import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default class PlayerDashboard extends Component {

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
        <tr onClick={() => this.props.selectPlayer(playerKey)} className="player-row" key={playerKey}>
          <td>{this.formatName(players[playerKey])}</td>
          <td>{players[playerKey].score}</td>
          <td><i onClick={(e) => this.remove(e, playerKey)} className="material-icons delete-btn">delete</i></td>
        </tr>
      )
    })
    return playerRows
  }

  remove(event, playerKey) {
    event.stopPropagation()
    const { deletePlayer } = this.props

    deletePlayer(playerKey)
  }

  render() {
    return (
      <div className="player-dashboard">
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
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}