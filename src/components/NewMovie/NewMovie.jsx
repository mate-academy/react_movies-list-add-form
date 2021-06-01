import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

    inputChange = (event) => {
      const { value, name } = event.target;

      this.setState(state => ({
        [name]: value,
      }));
    }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="formNewMovie">
        <input
          required
          type="text"
          placeholder="title"
          value={title}
          name="title"
          onChange={this.inputChange}
        />

        <input
          required
          type="text"
          placeholder="description"
          value={description}
          name="description"
          onChange={this.inputChange}
        />

        <input
          required
          type="url"
          placeholder="imgUrl"
          value={imgUrl}
          name="imgUrl"
          onChange={this.inputChange}
        />

        <input
          required
          type="url"
          placeholder="imdbUrl"
          value={imdbUrl}
          name="imdbUrl"
          onChange={this.inputChange}
        />

        <input
          required
          type="text"
          placeholder="imdbId"
          value={imdbId}
          name="imdbId"
          onChange={this.inputChange}
        />

        <button type="submit">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
