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
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  getMovie = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    event.preventDefault();

    return {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
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
    this.props.addMovie(this.getMovie(event));
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
