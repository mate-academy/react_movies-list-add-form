import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './NewMovie.scss';

function isValid(obj) {
  return Object.values(obj).every(value => value);
}

export class NewMovie extends Component {
  state = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    error: {
      titleError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    },
    validation: {
      titleValid: false,
      imgUrlValid: false,
      imdbUrlValid: false,
      imdbIdValid: false,
    },
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState(prevState => ({
      movie: {
        ...prevState.movie,
        [name]: value.trim(),
      },
    }));
  };

  onBlur = ({ target }) => {
    const { name, value } = target;
    const nameError = `${name}Error`;
    const nameValidation = `${name}Valid`;
    const patternString = /[^\s\w\d]/g;
    // eslint-disable-next-line max-len
    const patternUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/g;

    this.setState((prevState) => {
      if (name === 'title' || name === 'imdbId') {
        return {
          error: {
            ...prevState.error,
            [nameError]: !patternString.test(value),
          },
          validation: {
            ...prevState.validation,
            [nameValidation]: true,
          },
        };
      }

      return {
        error: {
          ...prevState.error,
          [nameError]: Boolean(patternUrl.test(value)),
        },
        validation: {
          ...prevState.validation,
          [nameValidation]: true,
        },
      };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { addMovie } = this.props;
    const newMovie = { ...this.state.movie };
    const error = { ...this.state.error };
    const validation = { ...this.state.validation };

    if (isValid(error) && isValid(validation)) {
      addMovie(newMovie);

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    const valid = this.state.validation;
    const error = { ...this.state.error };

    return (
      <form
        className="form"
        name="newMovie"
        onSubmit={this.handleSubmit}
      >
        <label
          className={cx('form_label label', {
            'form__label-titleError': valid.titleValid && !error.titleError,
          })}
          htmlFor="title"
        >
          Add title
        </label>
        <input
          className={cx('form__input', {
            'form__input-valid': valid.titleValid && error.titleError,
            'form__input-notValid': valid.titleValid && !error.titleError,
          })}
          type="text"
          name="title"
          placeholder="type title"
          value={title}
          onChange={this.handleChange}
          onBlur={this.onBlur}
        />
        <label
          className="form__label label"
          htmlFor="description"
        >
          Add Description
        </label>
        <textarea
          className="form__textarea textarea"
          name="description"
          placeholder="type description"
          value={description}
          onChange={this.handleChange}
          rows="7"
        />
        <label
          className={cx('form_label label', {
            'form__label-imgUrlError': valid.imgUrlValid && !error.imgUrlError,
          })}
          htmlFor="imgUrl"
        >
          Add img url
        </label>
        <input
          className={cx('form__input', {
            'form__input-valid': valid.imgUrlValid && error.imgUrlError,
            'form__input-notValid': valid.imgUrlValid && !error.imgUrlError,
          })}
          type="text"
          name="imgUrl"
          placeholder="type img address"
          value={imgUrl}
          onChange={this.handleChange}
          onBlur={this.onBlur}
        />
        <label
          className={cx('form_label label', {
            'form__label-ImdbUrlError':
              valid.imdbUrlValid && !error.imdbUrlError,
          })}
          htmlFor="imdbUrl"
        >
          Add IMDB url
        </label>
        <input
          className={cx('form__input', {
            'form__input-valid': valid.imdbUrlValid && error.imdbUrlError,
            'form__input-notValid': valid.imdbUrlValid && !error.imdbUrlError,
          })}
          type="text"
          name="imdbUrl"
          placeholder="type IMDB url"
          value={imdbUrl}
          onChange={this.handleChange}
          onBlur={this.onBlur}
        />
        <label
          className={cx('form_label label', {
            'form__label-ImdbIdError': valid.imdbIdValid && !error.imdbIdError,
          })}
          htmlFor="imdbId"
        >
          Add IMDB id
        </label>
        <input
          className={cx('form__input', {
            'form__input-valid': valid.imdbIdValid && error.imdbIdError,
            'form__input-notValid': valid.imdbIdValid && !error.imdbIdError,
          })}
          type="text"
          name="imdbId"
          placeholder="type IMDB id"
          value={imdbId}
          onChange={this.handleChange}
          onBlur={this.onBlur}
        />
        <button
          className="form_buttom button"
          type="submit"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
