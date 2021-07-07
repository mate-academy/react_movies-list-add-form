import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

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
      [name]: value.trim(),
    });
  }

  handleSubmit = (event) => {
    const { addMovie } = this.props;

    event.preventDefault();
    addMovie(this.state);

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
        className="movie-form"
        onSubmit={this.handleSubmit}
      >
        <span className="movie-form__title">
          Add new film
        </span>
        <label htmlFor="title">
          Write movie title
        </label>
        <input
          value={title}
          type="text"
          id="title"
          name="title"
          className="movie-form__input"
          autoComplete="off"
          placeholder="Title"
          onChange={this.handleChange}
          required
        />
        <label htmlFor="description">
          Write short description
        </label>
        <textarea
          value={description}
          id="description"
          name="description"
          className="movie-form__input movie-form__input--description"
          placeholder="Description"
          onChange={this.handleChange}
          maxLength="400"
        />
        <label htmlFor="imgUrl">
          Add photo
        </label>
        <input
          value={imgUrl}
          type="url"
          id="imgUrl"
          name="imgUrl"
          className="movie-form__input"
          placeholder="Image link"
          onChange={this.handleChange}
          required
        />
        <label htmlFor="imdbUrl">
          Add link
        </label>
        <input
          value={imdbUrl}
          type="url"
          id="imdbUrl"
          name="imdbUrl"
          className="movie-form__input"
          placeholder="Imdb link"
          onChange={this.handleChange}
          required
        />
        <label htmlFor="imdbId">
          Add ID
        </label>
        <input
          value={imdbId}
          type="text"
          id="imdbId"
          name="imdbId"
          className="movie-form__input"
          placeholder="Imdb id"
          onChange={this.handleChange}
          required
        />
        <button
          className="movie-form__btn"
          type="submit"
        >
          Add film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
