import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    movieCard: {
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
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      movieCard: {
        ...state.movieCard,
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
    const validationInput  = new RegExp('^((([A-Za-z]{3,9}:(?://)?)'
    + '(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|'
    + '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)'
    + '((?:/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)'
    + '#?(?:[.!/\\\\w]*))?)$');

    this.setState(state => ({
      movieCard: {
        ...state.movieCard,
        [name]: value,
      },
      error: {
        ...state.error,
        [name]: false,
      },
    }));

    if (!validationInput.test(value)) {
      this.setState(state => ({
        error: {
          ...state.error,
          [name]: true,
        },
      }));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state.movieCard;

    if (!title.trim() || !imgUrl || !imdbUrl || !imdbId.trim()) {
      this.setState(state => ({
        error: {
          ...state.errors,
          title: !state.movieCard.title.trim(),
          imgUrl: !state.movieCard.imgUrl,
          imdbUrl: !state.movieCard.imdbUrl,
          imdbId: !state.movieCard.imdbId.trim(),
        },
      }));

      return;
    }

    this.setState({
      movieCard: {
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

    const addNewMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(addNewMovie);
  };

  render() {
    const { movieCard, error } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <div>Title</div>
        <input
          value={movieCard.title}
          type="text"
          name="title"
          onChange={this.handleChange}
          placeholder="write a title"
        />
        <br />
        {error.title && (
          <span>
            Please enter a title
          </span>
        )}
        <br />

        <div>Description</div>
        <textarea
          value={movieCard.description}
          name="description"
          onChange={this.handleChange}
          placeholder="write a description"
        />
        <br />
        <br />
        <div>imgUrl</div>
        <input
          type="text"
          value={movieCard.imgUrl}
          name="imgUrl"
          onChange={this.handleChangeUrl}
          placeholder="write a imgUrl"
        />
        <br />
        {error.imgUrl && (
          <span>
            Please enter correct imgUrl
          </span>
        )}
        <br />
        <div>imdbUrl</div>
        <input
          value={movieCard.imdbUrl}
          type="text"
          name="imdbUrl"
          onChange={this.handleChangeUrl}
          placeholder="write a imdbUrl"
        />
        <br />
        {error.imdbUrl && (
          <span>
            Please enter correct imdbUrl
          </span>
        )}
        <br />
        <div>imdbId</div>
        <input
          value={movieCard.imdbId}
          type="text"
          name="imdbId"
          onChange={this.handleChange}
          placeholder="write a imdbId"
        />
        <br />
        {error.imdbId && (
          <span>
            Please enter a imdbId
          </span>
        )}
        <br />

        <button
          type="submit"
          disabled={error.imgUrl || error.imdbUrl}
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
