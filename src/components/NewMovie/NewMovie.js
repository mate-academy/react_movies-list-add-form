
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AddInput } from './addInput';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  chahgeState = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const movie = { ...this.state };

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    this.props.onAdd(movie);
  }

  render() {
    const controlButton = Object.entries(this.state)
      .filter(([key]) => (key !== 'description'));

    return (
      <form
        className="movie-form"
        onSubmit={this.handleSubmit}
      >
        <AddInput
          state={this.state}
          onChange={this.chahgeState}
        />
        <br />
        <button
          type="submit"
          disabled={controlButton.some(([, value]) => !value)}
        >
          ADD
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
