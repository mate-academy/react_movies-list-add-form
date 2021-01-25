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

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  submitMovie = (e) => {
    e.preventDefault();
    const { title, description, imgUrl, imdbId, imdbUrl } = this.state;

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
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        action=""
        method="POST"
        className="movie"
        onSubmit={this.submitMovie}
      >
        <label htmlFor="input-title">
          <b>Title: </b>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Input title*"
          id="input-title"
          className="movie__inputs"
          value={title}
          onChange={this.handleChange}
          required
        />
        <br />

        <label
          htmlFor="input-description"
          className="movie__label-description"
        >
          <b>Description: </b>
        </label>
        <textarea
          type="text"
          name="description"
          placeholder="Input description*"
          id="input-description"
          className="movie__textarea"
          value={description}
          onChange={this.handleChange}
          rows="3"
        />
        <br />

        <label htmlFor="input-imageUrl">
          <b>Image url: </b>
        </label>
        <input
          type="text"
          name="imgUrl"
          placeholder="Input image url*"
          id="input-imageUrl"
          className="movie__inputs"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />
        <br />

        <label htmlFor="input-imdbUrl">
          <b>IMDB url: </b>
        </label>
        <input
          type="text"
          name="imdbUrl"
          placeholder="Input IMDB url*"
          id="input-imdbUrl"
          className="movie__inputs"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />
        <br />

        <label htmlFor="input-imdbId">
          <b>IMDB id: </b>
        </label>
        <input
          type="text"
          name="imdbId"
          placeholder="Input IMDB id*"
          id="input-imdbId"
          className="movie__inputs"
          value={imdbId}
          onChange={this.handleChange}
          required
        />
        <br />

        <button
          type="submit"
          className="movie__submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
