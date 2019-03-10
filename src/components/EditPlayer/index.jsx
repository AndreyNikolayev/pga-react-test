import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import PropTypes from 'prop-types';

export default class EditPlayer extends Component {
  constructor(props) {
    super(props)

    this.onChangeInput = this.onChangeInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      playerId: this.props.match.params.id,
      firstName: this.composeInput('firstName'),
      lastName: this.composeInput('lastName'),
      score: this.composeInput('score')
    }
  }

  componentWillUpdate(nextProps, prevState) {
    if (nextProps.match.params.id === prevState.playerId) {
      return;
    }
    this.setState({
      playerId: this.props.match.params.id,
      firstName: this.composeInput('firstName'),
      lastName: this.composeInput('lastName'),
      score: this.composeInput('score')
    })
  }

  composeInput(inputName) {
    const inputValue = this.props.player ? this.props.player[inputName] : ''
    return {
      value: inputValue,
      isTouched: false,
      errorMessage: this.validateInput(inputName, inputValue)
    }
  }

  onTouchedInput(inputName) {
    this.setState({
      [inputName]: {
        ...this.state[inputName],
        isTouched: true
      }
    })
  }

  onChangeInput(inputName, e) {
    this.setState({
      [inputName]: {
        ...this.state[inputName],
        isTouched: false,
        value: e.target.value,
        errorMessage: this.validateInput(inputName, e.target.value)
      }
    })
  }

  validateInput(inputName, value) {
    if (value === '') {
      return 'Field is required'
    }
    if (inputName === 'score') {
      if (!/^\d+$/.test(value)) {
        return 'Only digits are allowed';
      }
      const numberValue = +value;
      if (numberValue > 100) {
        return 'Value must be between 0 and 100';
      }
    }
    return '';
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.state.firstName.errorMessage || this.state.lastName.errorMessage || this.state.score.errorMessage) {
      this.setState({
        firstName: {
          ...this.state.firstName,
          isTouched: true
        },
        lastName: {
          ...this.state.lastName,
          isTouched: true
        },
        score: {
          ...this.state.score,
          isTouched: true
        },
      });
      return;
    }

    const player = {
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      score: this.state.score.value
    }

    this.props.handleSave(this.state.playerId, player)
  }

  get pageTitle() {
    return this.state.playerId ? 'Edit Player' : 'Add Player';
  }

  get labelClass() {
    return this.state.playerId ? "active" : ""
  }

  isShowInputError(inputName) {
    return this.state[inputName].isTouched && this.state[inputName].errorMessage
  }

  render() {
    return (
      <div className="edit-player">
        <h3>{this.pageTitle}</h3>
        <div className="row">
          <form className="s12 m6" onSubmit={this.onSubmit} noValidate>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="firstName" className={this.labelClass}>First Name:  </label>
                <input id="firstName"
                  type="text"
                  className={"form-control " + (this.isShowInputError('firstName') ? "invalid" : "")}
                  value={this.state.firstName.value}
                  onChange={(e) => this.onChangeInput('firstName', e)}
                  onBlur={(e) => this.onTouchedInput('firstName', e)}
                />
                <span className="helper-text" data-error={this.state.firstName.errorMessage}></span>
              </div>
              <div className="input-field col s12">
                <label htmlFor="lastName" className={this.labelClass}>Last Name: </label>
                <input id="lastName"
                  type="text"
                  className={"form-control " + (this.isShowInputError('lastName') ? "invalid" : "")}
                  value={this.state.lastName.value}
                  onChange={(e) => this.onChangeInput('lastName', e)}
                  onBlur={(e) => this.onTouchedInput('lastName', e)}
                />
                <span className="helper-text" data-error={this.state.lastName.errorMessage}></span>
              </div>
              <div className="input-field col s12">
                <label htmlFor="score" className={this.labelClass}>Score: </label>
                <input id="score"
                  type="number"
                  min="0"
                  max="100"
                  className={"form-control " + (this.isShowInputError('score') ? "invalid" : "")}
                  value={this.state.score.value}
                  onChange={(e) => this.onChangeInput('score', e)}
                  onBlur={(e) => this.onTouchedInput('score', e)}
                />
                <span className="helper-text" data-error={this.state.score.errorMessage}></span>
              </div>
              <div className="col s12">
                <Link to="/" className="cancel-btn waves-effect waves-light btn">Back</Link>
                <button type="submit" className="waves-effect waves-light btn">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

EditPlayer.propTypes = {
  player: PropTypes.object,
  save: PropTypes.func.isRequired
}
