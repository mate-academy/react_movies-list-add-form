import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import { Inputs } from './Inputs';
import { inputsFromServer } from './inputArray';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  resetState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.resetState();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <Inputs
          inputsFromServer={inputsFromServer}
          handleChange={this.handleChange}
          state={this.state}
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
