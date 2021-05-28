import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';
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
    error: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
    invalidImgUrl: false,
    invalidImdbUrl: false,
  };

  handleError = () => {
    const { newMovie } = this.state;

    Object.keys(newMovie).forEach(key => this.setState(state => ({
      error: {
        ...state.error,
        [key]: !state.newMovie[key],
      },
    })));
  }

  handleInputChange = ({ target }) => {
    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [target.name]: target.value,
      },
      error: {
        ...state.error,
        [target.name]: false,
      },
    }));
    // eslint-disable-next-line
    const validator = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (target.name === 'imgUrl') {
      this.setState({
        invalidImgUrl: false,
      });
    }

    if (target.name === 'imgUrl' && !target.value.match(validator)) {
      this.setState({
        invalidImgUrl: true,
      });
    }

    if (target.name === 'imdbUrl') {
      this.setState({
        invalidImdbUrl: false,
      });
    }

    if (target.name === 'imdbUrl' && !target.value.match(validator)) {
      this.setState({
        invalidImdbUrl: true,
      });
    }
  }

  clearForm = () => {
    const { newMovie } = this.state;

    Object.keys(newMovie).forEach(key => this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [key]: '',
      },

      error: {
        ...state.error,
        [key]: false,
      },
    })));
  }

  render() {
    const { newMovie, error, invalidImgUrl, invalidImdbUrl } = this.state;
    const { onAdd } = this.props;

    return (
      <form
        className="NewMovieForm"
        onSubmit={(event) => {
          event.preventDefault();
          this.handleError();
          if (!Object.values(newMovie).some(value => value === '')) {
            onAdd(newMovie);
            this.clearForm();
          }
        }}
      >
        <label
          className="NewMovieForm__label"
          htmlFor="title"
        >
          Please enter movie title:
        </label>
        <input
          className={classNames('NewMovieForm__input', {
            'NewMovieForm__input--error': error.title,
          })}
          name="title"
          type="text"
          id="title"
          value={newMovie.title}
          onChange={this.handleInputChange}
        />
        {error.title && (
          <p className="NewMovieForm__error">
            *Please enter the title
          </p>
        )}
        <label
          className="NewMovieForm__label"
          htmlFor="imgUrl"
        >
          Please enter movie image link:
        </label>
        <input
          className={classNames('NewMovieForm__input', {
            'NewMovieForm__input--error': error.imgUrl || invalidImgUrl,
          })}
          name="imgUrl"
          type="text"
          id="imgUrl"
          value={newMovie.imgUrl}
          onChange={this.handleInputChange}
        />
        {error.imgUrl && (
          <p className="NewMovieForm__error">
            *Movie image link required
          </p>
        )}
        {invalidImgUrl && (
          <p className="NewMovieForm__error">
            *not valid link
          </p>
        )}
        <label
          className="NewMovieForm__label"
          htmlFor="imdbUrl"
        >
          Please enter movie IMDB link:
        </label>
        <input
          className={classNames('NewMovieForm__input', {
            'NewMovieForm__input--error': error.imdbUrl || invalidImdbUrl,
          })}
          name="imdbUrl"
          type="text"
          id="imdbUrl"
          value={newMovie.imdbUrl}
          onChange={this.handleInputChange}
        />
        {error.imdbUrl && (
          <p className="NewMovieForm__error">
            *IMDB link required
          </p>
        )}
        {invalidImdbUrl && (
          <p className="NewMovieForm__error">
            *not valid link
          </p>
        )}
        <label
          className="NewMovieForm__label"
          htmlFor="imdbId"
        >
          Please enter movie IMDB ID:
        </label>
        <input
          className={classNames('NewMovieForm__input', {
            'NewMovieForm__input--error': error.imdbId,
          })}
          name="imdbId"
          type="text"
          id="imdbId"
          value={newMovie.imdbId}
          onChange={this.handleInputChange}
        />
        {error.imdbId && (
          <p className="NewMovieForm__error">
            *IMDB ID required
          </p>
        )}
        <label
          className="NewMovieForm__label"
          htmlFor="description"
        >
          Please add movie description:
        </label>
        <textarea
          className={classNames('NewMovieForm__textarea', {
            'NewMovieForm__input--error': error.description,
          })}
          name="description"
          id="description"
          value={newMovie.description}
          onChange={this.handleInputChange}
        />
        {error.description && (
          <p className="NewMovieForm__error">
            *Please enter movie description
          </p>
        )}
        <button
          className="NewMovieForm__button"
          type="submit"
          disabled={
            Object.values(error).some(err => err === true)
            || invalidImgUrl
            || invalidImdbUrl
          }
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
