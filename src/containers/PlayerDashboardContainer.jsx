import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { deletePlayer } from '../state/actions';
import { getPlayers } from '../state/selectors';
import PlayerDashboard from '../components/PlayerDashboard';
import PropTypes from 'prop-types';

class PlayerDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.goToDetails = this.goToDetails.bind(this);
  }

  goToDetails(playerKey) {
    this.props.history.push(`edit/${playerKey}`)
  }

  render() {
    return <PlayerDashboard {...this.props} selectPlayer={this.goToDetails} />
  }
}

PlayerDashboardContainer.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  deletePlayer: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    players: getPlayers(state)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { deletePlayer })
)(PlayerDashboardContainer)
