import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
      invalidUrl: false,
    },
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
      errors: {
        ...state.errors,
        [name]: false,
      },
    }));
  }

  handleChangeUrl = (event) => {
    const { value, name } = event.target;
    /* eslint-disable-next-line */
    const validation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
      errors: {
        ...state.errors,
        [name]: false,
      },
    }));

    if (!validation.test(value)) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: true,
        },
      }));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.movie;

    if (!title.trim() || !imgUrl || !imdbUrl || !imdbId.trim()) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          title: !state.movie.title.trim(),
          imgUrl: !state.movie.imgUrl,
          imdbUrl: !state.movie.imdbUrl,
          imdbId: !state.movie.imdbId.trim(),
        },
      }));

      return;
    }

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.clearForm();
  }

  clearForm() {
    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      errors: {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
        invalidUrl: false,
      },
    });
  }

  render() {
    const { movie, errors } = this.state;

    return (
      <form
        name="newMovie"
        className="field"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className={classNames('input', { 'input is-danger': errors.title })}
          name="title"
          id="title"
          value={movie.title}
          onChange={this.handleChange}
          placeholder="Movie Title"
        />
        <br />
        {errors.title && (
          <span className="error">Please enter a title</span>
        )}
        <br />

        <textarea
          type="text"
          className="textarea"
          name="description"
          id="description"
          value={movie.description}
          onChange={this.handleChange}
          placeholder="Movie Description"
        />
        <br />

        <input
          type="text"
          className={classNames('input', { 'input is-danger': errors.imgUrl })}
          name="imgUrl"
          id="imgUrl"
          value={movie.imgUrl}
          onChange={this.handleChange}
          placeholder="Image Url"
        />
        <br />
        {errors.imgUrl && (
          <span className="error">
            Please enter valid imgUrl
          </span>
        )}
        <br />

        <input
          type="text"
          className={classNames('input', { 'input is-danger': errors.imdbUrl })}
          name="imdbUrl"
          id="imdbUrl"
          value={movie.imdbUrl}
          onChange={this.handleChange}
          placeholder="IMDB Url"
        />
        <br />
        {errors.imdbUrl && (
          <span className="error">
            Please enter valid imdbUrl
          </span>
        )}
        <br />

        <input
          type="text"
          className={classNames('input', { 'input is-danger': errors.imdbId })}
          name="imdbId"
          id="imdbId"
          value={movie.imdbId}
          onChange={this.handleChange}
          placeholder="IMDB Id"
        />
        {errors.imdbId && (
          <span className="error">
            Please enter a imdbId
          </span>
        )}
        <br />
        <button
          type="submit"
          className="button"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
