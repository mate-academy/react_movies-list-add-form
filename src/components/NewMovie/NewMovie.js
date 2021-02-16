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
    error: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
      invalidUrl: false,
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
      error: {
        ...state.error,
        [name]: false,
      },
    }));
  };

  handleChangeUrl = (event) => {
    const { value, name } = event.target;
    /* eslint-disable-next-line */
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
      error: {
        ...state.error,
        [name]: false,
      },
    }));

    if (!regex.test(value)) {
      this.setState(state => ({
        error: {
          ...state.error,
          [name]: true,
        },
      }));
    }
  };

  handleSubmit = (event, onAdd) => {
    event.preventDefault();

    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state.movie;

    if (!title.trim() || !imgUrl || !imdbUrl || !imdbId.trim()) {
      this.setState(state => ({
        error: {
          ...state.errors,
          title: !state.movie.title.trim(),
          imgUrl: !state.movie.imgUrl,
          imdbUrl: !state.movie.imdbUrl,
          imdbId: !state.movie.imdbId.trim(),
        },
      }));

      return;
    }

    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      error: {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
    });

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  render() {
    const { movie, error } = this.state;
    const { onAdd } = this.props;

    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.handleSubmit(event, onAdd);
      }}
      >
        <input
          type="text"
          className={classNames({ invalid: error.title })}
          name="title"
          value={movie.title}
          onChange={this.handleChange}
          placeholder="Title"
        />
        <br />
        {error.title && (
          <span className="error">
            Please enter a title
          </span>
        )}
        <br />

        <input
          type="text"
          name="description"
          value={movie.description}
          onChange={this.handleChange}
          placeholder="Description"
        />
        <br />
        <br />

        <input
          type="text"
          className={classNames({
            invalid: error.imgUrl, error: error.imgUrl,
          })}
          name="imgUrl"
          value={movie.imgUrl}
          onChange={this.handleChangeUrl}
          placeholder="imgUrl"
        />
        <br />
        {error.imgUrl && (
          <span className="error">
            Please enter valid imgUrl
          </span>
        )}
        <br />

        <input
          type="text"
          className={classNames({
            invalid: error.imdbUrl, error: error.imdbUrl,
          })}
          name="imdbUrl"
          value={movie.imdbUrl}
          onChange={this.handleChangeUrl}
          placeholder="imdbUrl"
        />
        <br />
        {error.imdbUrl && (
          <span className="error">
            Please enter valid imdbUrl
          </span>
        )}
        <br />

        <input
          type="text"
          className={classNames({ invalid: error.imdbId })}
          name="imdbId"
          value={movie.imdbId}
          onChange={this.handleChange}
          placeholder="imdbId"
        />
        <br />
        {error.imdbId && (
          <span className="error">
            Please enter a imdbId
          </span>
        )}
        <br />

        <button
          type="submit"
          disabled={error.imgUrl || error.imdbUrl}
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
