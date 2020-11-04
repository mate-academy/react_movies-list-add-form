
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Inputs } from './inputs';
import './NewMovie.scss';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = { ...initialState };

  controlButton = Object.entries(this.state)
    .filter(([key]) => (key !== 'description'));

  componentDidUpdate(prevState) {
    if (prevState !== this.State) {
      this.controlButton = Object.entries(this.state)
        .filter(([key]) => (key !== 'description'));
    }
  }

  chahgeState = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const movie = { ...this.state };

    this.setState({ ...initialState });

    this.props.addMovie(movie);
  }

  render() {
    return (
      <form
        className="movie-form"
        onSubmit={this.handleSubmit}
      >
        <Inputs
          state={this.state}
          onChange={this.chahgeState}
        />
        <br />
        <button
          type="submit"
          disabled={this.controlButton.some(([, value]) => !value)}
        >
          ADD
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
