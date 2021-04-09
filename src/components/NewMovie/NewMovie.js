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
    imgUrlError: false,
    imdbUrlError: false,
  };

  addMovieToState = ({ target }) => {
    const { name, value } = target;
    // eslint-disable-next-line max-len
    const isValid = /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (!isValid.test(value)) {
        this.setState({ [name]: value });
        // eslint-disable-next-line no-unused-expressions
        (name === 'imgUrl')
          ? this.setState({ imgUrlError: true })
          : this.setState({ imdbUrlError: true });
      } else {
        this.setState({ [name]: value });
        // eslint-disable-next-line no-unused-expressions
        (name === 'imgUrl')
          ? this.setState({ imgUrlError: false })
          : this.setState({ imdbUrlError: false });
      }
    } else {
      this.setState({ [name]: value });
    }
  }

  addNewMovieOnPage = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;
    const newMovie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
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
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
      imdbUrlError,
      imgUrlError,
    } = this.state;

    return (
      <>
        <h2 className="add-movie-heading">Add movie</h2>
        <form
          className="movie-form"
          onSubmit={this.addNewMovieOnPage}
        >
          <input
            type="text"
            name="title"
            value={title}
            className="movie-form__input"
            onChange={this.addMovieToState}
            placeholder="Movie title"
            required
          />
          <input
            type="text"
            name="imgUrl"
            className={imgUrlError
              ? 'movie-form__input movie-form__input--error'
              : 'movie-form__input'
            }
            onChange={this.addMovieToState}
            placeholder="Enter the Image URL"
            value={imgUrl}
            required
          />
          <span className={imgUrlError
            ? 'error-message error-message--active'
            : 'error-message'
          }
          >
            Please enter a valid images URL!
          </span>
          <input
            type="text"
            name="imdbUrl"
            className={imdbUrlError
              ? 'movie-form__input movie-form__input--error'
              : 'movie-form__input'
            }
            onChange={this.addMovieToState}
            placeholder="Enter the imdbUrl"
            value={imdbUrl}
            required
          />
          <span
            className={imdbUrlError
              ? 'error-message error-message--active'
              : 'error-message'
            }
          >
            Please enter a valid imdb URL!
          </span>
          <input
            type="text"
            name="imdbId"
            className="movie-form__input"
            onChange={this.addMovieToState}
            placeholder="Enter the imdbId movie"
            value={imdbId}
            required
          />
          <textarea
            name="description"
            id="movie-description"
            className="movie-form__input"
            placeholder="Movie Description"
            cols="10"
            rows="10"
            onChange={this.addMovieToState}
            value={description}
          />
          <button
            type="submit"
            className="movie-form__button"
            disabled={imgUrlError || imdbUrlError}
          >
            Add movie
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
