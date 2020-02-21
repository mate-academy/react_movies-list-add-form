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
    imgUrlError: false,
    imdbUrlError: false,
  };

  handleMovieSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    let isValid = true;

    if (!pattern.test(imgUrl)) {
      isValid = false;

      this.setState({
        imgUrlError: true,
      });
    }

    if (!pattern.test(imdbUrl)) {
      isValid = false;

      this.setState({
        imdbUrlError: true,
      });
    }

    if (isValid) {
      this.props.addMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        imgUrlError: false,
        imdbUrlError: false,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value.replace(/^\s/, ''),
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      imgUrlError,
      imdbUrlError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleMovieSubmit}
        className="movie-adder"
      >
        <label
          htmlFor="title"
          className="movie-adder__label"
        >
          Movie title:
        </label>
        <input
          required
          id="title"
          name="title"
          value={title}
          onChange={this.handleChange}
          className="movie-adder__input"
        />
        <label
          htmlFor="description"
          className="movie-adder__label"
        >
          Movie description:
        </label>
        <textarea
          rows="10"
          id="description"
          name="description"
          value={description}
          onChange={this.handleChange}
          className="movie-adder__input movie-adder__textarea"
        />
        <label
          htmlFor="imgUrl"
          className="movie-adder__label"
        >
          {!imdbUrlError
            ? 'Movie imgUrl:'
            : 'Please, enter the correct imgUrl'
          }
        </label>
        <input
          required
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          className={imgUrlError
            ? 'movie-adder__input movie-adder__input--error'
            : 'movie-adder__input'
          }
        />
        <label
          htmlFor="imdbUrl"
          className="movie-adder__label"
        >
          {!imdbUrlError
            ? 'Movie imdbUrl:'
            : 'Please, enter the correct imdbUrl'
          }
        </label>
        <input
          required
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          className={imdbUrlError
            ? 'movie-adder__input movie-adder__input--error'
            : 'movie-adder__input'
          }
        />
        <label
          htmlFor="imdbId"
          className="movie-adder__label"
        >
          Movie imdbId:
        </label>
        <input
          required
          id="imdbId"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          className="movie-adder__input"
        />
        <button
          type="submit"
          className="movie-adder__submit"
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
