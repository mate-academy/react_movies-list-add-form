import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  submitHandler = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const imgUrl = form.imgUrl.value;
    const imdbUrl = form.imdbUrl.value;
    const imdbId = form.imdbId.value;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    form.reset();

    this.props.addMovie(newMovie);
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          id="title"
          className="movie-title"
          placeholder="Enter the title"
          required
        />
        <textarea
          id="description"
          className="movie-description"
          placeholder="Enter the description"
        />
        <input
          id="imgUrl"
          className="movie-imgUrl"
          type="url"
          placeholder="Enter the imgUrl"
          required
        />
        <input
          type="text"
          id="imdbUrl"
          className="movie-imdbUrl"
          placeholder="Enter the imdbUrl"
          required
        />
        <input
          type="text"
          id="imdbId"
          className="movie-imdbId"
          placeholder="Enter the imdbId"
          required
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
