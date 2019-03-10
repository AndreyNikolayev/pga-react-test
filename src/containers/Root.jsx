import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import PlayerDashboardContainer from '../containers/PlayerDashboardContainer';
import EditPlayerContainer from '../containers/EditPlayerContainer';
import { fetchPlayers } from '../state/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getIsLoading } from '../state/selectors';
import Spinner from '../components/Spinner';

class Root extends Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <div className="nav-wrapper">
            <Link to='/' className="brand-logo">PGA React Test</Link>
          </div>
        </nav>
        <div className="container">
          {!this.props.loading && (
            <Switch>
              <Route exact path='/edit' component={EditPlayerContainer} />
              <Route exact path='/edit/:id' component={EditPlayerContainer} />
              <Route exact path='/' component={PlayerDashboardContainer} />
            </Switch>
          )}
          {this.props.loading && (
            <Spinner></Spinner>
          )}
        </div>

      </React.Fragment>
    );
  }

  componentWillMount() {
    this.props.fetchPlayers();
  }
}

const mapStateToProps = (state) => {
  return {
    loading: getIsLoading(state)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchPlayers })
)(Root);
