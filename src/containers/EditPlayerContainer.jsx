import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { addUpdatePlayer } from '../state/actions';
import { getCurrentPlayer } from '../state/selectors';
import EditPlayer from '../components/EditPlayer';

class EditPlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    this.moveToDashboard();
  }

  componentWillUpdate() {
    this.moveToDashboard();
  }

  moveToDashboard() {
    if (this.props.match.params.id && !this.props.player) {
      this.props.history.push('');
    }
  }

  async save(playerId, player) {
    const { addUpdatePlayer } = this.props

    await addUpdatePlayer(playerId, player)
    this.props.history.push('');
  }

  render() {
    return <EditPlayer {...this.props} handleSave={this.save} />
  }
}

const mapStateToProps = (state, props) => {
  return {
    player: getCurrentPlayer(props.match.params.id)(state)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { addUpdatePlayer })
)(EditPlayerContainer)
