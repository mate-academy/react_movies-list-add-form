import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { MovieCard } from '../MovieCard';

export class NewMovie extends Component {
  state = {
    values: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    touched: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
    errors: {
      title: null,
      description: null,
      imgUrl: null,
      imdbUrl: null,
      imdbId: null,
    },
  };

  isTextValid = (text) => {
    return text && (text.search(/\w/) !== -1);
  }

  isUrlValid = (url) => {
    // eslint-disable-next-line max-len
    return url && url.test(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
  }

  manageTextFieldError = (name, value) => {
    if (this.isTextValid(value)) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: `${name} field should not be empty`,
        },
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: null,
        },
      }));
    }
  }

  manageUrlError = (name, value) => {
    if (this.isUrlValid(value)) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: `${name} URL should be correct`,
        },
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: null,
        },
      }));
    }
  }

  handleChange = (event) => {
    const { target: { name, value } } = event;

    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  }

  handleBlur = ({ name, value }) => {
    // eslint-disable-next-line no-console
    // console.log('blur', name, value);

    if (name === 'imgUrl' || name === 'imdbUrl') {
      this.manageUrlError(name, value);
    } else {
      this.manageTextFieldError(name, value);
    }
  }

  handleFocus = ({ name, value }) => {
    // eslint-disable-next-line no-console
    // console.log('focus', name, value);
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.values;

    const movie = this.state.values;
    const { addMovie } = this.props;

    return (
      <form
        name="addMovie"
        onSubmit={event => addMovie(event, movie)}
      >
        <h1 className="form__header">
          Add new movie
        </h1>
        <label>
          <span className="label">
            Title:
          </span>
          <input
            type="text"
            name="title"
            onChange={event => this.handleChange(event)}
            onBlur={event => this.handleBlur(event.target)}
            onFocus={event => this.handleFocus(event.target)}
            value={title}
            placeholder="Enter the title"
          />
        </label>
        <label>
          <span className="label">
            Description:
          </span>
          <input
            type="textarea"
            name="description"
            onChange={event => this.handleChange(event)}
            onBlur={event => this.handleBlur(event.target)}
            onFocus={event => this.handleFocus(event.target)}
            value={description}
            placeholder="Enter the description"
          />
        </label>
        <label>
          <span className="label">
            Poster link:
          </span>
          <input
            type="text"
            name="imgUrl"
            onChange={event => this.handleChange(event)}
            onBlur={event => this.handleBlur(event.target)}
            onFocus={event => this.handleFocus(event.target)}
            value={imgUrl}
            placeholder="paste the link to poster"
          />
        </label>
        <label>
          <span className="label">
            IMDB link:
          </span>
          <input
            type="text"
            name="imdbUrl"
            onChange={event => this.handleChange(event)}
            onBlur={event => this.handleBlur(event.target)}
            onFocus={event => this.handleFocus(event.target)}
            value={imdbUrl}
            placeholder="paste the link to IMDB"
          />
        </label>
        <label>
          <span className="label">
            IMDB ID:
          </span>
          <input
            type="textarea"
            name="imdbId"
            onChange={event => this.handleChange(event)}
            onBlur={event => this.handleBlur(event.target)}
            onFocus={event => this.handleFocus(event.target)}
            value={imdbId}
            placeholder="paste the IMDB ID"
          />
          {this.state.errors.imdbId
            && <span className="error">{this.state.errors.imdbId}</span>}
        </label>
        <br />
        <button
          type="submit"
          className="form__submit-button"
        >
          Submit
        </button>
        <br />

        <h2 className="preview-header">
          Preview:
        </h2>

        <MovieCard key={movie.imdbId} {...movie} />
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
