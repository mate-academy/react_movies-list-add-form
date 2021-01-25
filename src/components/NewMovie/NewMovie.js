import React, { Component } from 'react';
import './NewMovie.scss';
import { Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    valid: false,
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  changeHandler = (e) => {
    const { name, value } = e.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value.trim(),
      },
    }));
  }

  submitHandler = (e) => {
    e.preventDefault();

    const { valid, newMovie } = this.state;
    const entries = Object.entries(newMovie);
    const { onAdd } = this.props;

    entries.forEach((entry) => {
      if (!entry[1]) {
        this.setState(prevState => ({
          valid: false,
          errors: {
            ...prevState.errors,
            [entry[0]]: true,
          },
        }));
      } else {
        this.setState(prevState => ({
          valid: true,
          errors: {
            ...prevState.errors,
            [entry[0]]: false,
          },
        }));
      }
    });

    if (valid) {
      onAdd(newMovie);
      this.setState({
        newMovie: {
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        },
      });
    }
  }

  render() {
    const {
      newMovie: {
        title,
        imgUrl,
        description,
        imdbUrl,
        imdbId,
      },
      errors,
    } = this.state;

    return (
      <form
        className="NewMovie"
        method="POST"
        onSubmit={this.submitHandler}
      >
        <label
          className="NewMovie__label"
          htmlFor="movie-title"
        >
          Movie Title
        </label>
        {errors.title && (
          <Alert variant="danger">
            Please, fill in movie title
          </Alert>
        )}
        <input
          className={errors.title
            ? 'NewMovie__input NewMovie__input--invalid'
            : 'NewMovie__input'}
          name="title"
          id="movie-title"
          value={title}
          type="text"
          onChange={this.changeHandler}
        />

        <label className="NewMovie__label" htmlFor="movie-description">
          Movie Description
        </label>
        <textarea
          className="NewMovie__input"
          name="description"
          id="movie-description"
          value={description}
          onChange={this.changeHandler}
        />

        <label className="NewMovie__label" htmlFor="movie-poster">
          Link to the Movie Poster
        </label>
        {errors.imgUrl && (
          <Alert variant="danger">
            Please, provide link to the movie poster
          </Alert>
        )}
        <input
          className={errors.imgUrl
            ? 'NewMovie__input NewMovie__input--invalid'
            : 'NewMovie__input'}
          name="imgUrl"
          id="movie-poster"
          value={imgUrl}
          onChange={this.changeHandler}
          type="text"
        />

        <label className="NewMovie__label" htmlFor="movie-imdb">
          Link to the IMDb Profile
        </label>
        {errors.imdbUrl && (
          <Alert variant="danger">
            Please, provide link to the IMDb profile
          </Alert>
        )}
        <input
          className={errors.imdbUrl
            ? 'NewMovie__input NewMovie__input--invalid'
            : 'NewMovie__input'}
          id="movie-imdb"
          name="imdbUrl"
          type="text"
          value={imdbUrl}
          onChange={this.changeHandler}
        />

        <label
          className="NewMovie__label"
          htmlFor="movie-imdb-id"
        >
          IMDb id
        </label>
        {errors.imdbId && (
          <Alert variant="danger">
            Please, fill in the IMDb id
          </Alert>
        )}
        <input
          className={errors.imdbId
            ? 'NewMovie__input NewMovie__input--invalid'
            : 'NewMovie__input'}
          id="movie-imdb-id"
          name="imdbId"
          type="text"
          value={imdbId}
          onChange={this.changeHandler}
        />

        <Button
          type="submit"
          className="NewMovie__button"
        >
          Add New Movie
        </Button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
