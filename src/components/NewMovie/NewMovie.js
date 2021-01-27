import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  };

  changeHandler = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state.movie);
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state.movie;

    return (
      <form
        className="newMovie"
        name="newMovie"
        onSubmit={(e) => {
          this.submitHandler(e);
        }}
      >
        <label
          className="newMovie__label"
          htmlFor="title"
        >
          Movie title
        </label>
        <input
          className="newMovie__input"
          type="text"
          required
          name="title"
          id="title"
          value={title}
          placeholder="Movie title"
          onChange={(e) => {
            this.changeHandler(e);
          }}
        />

        <label
          className="newMovie__label"
          htmlFor="description"
        >
          Movie description
        </label>
        <textarea
          className="newMovie__input"
          name="description"
          id="description"
          value={description}
          placeholder="Movie description"
          onChange={(e) => {
            this.changeHandler(e);
          }}
        />

        <label
          className="newMovie__label"
          htmlFor="imgUrl"
        >
          Image url
        </label>
        <input
          className="newMovie__input"
          type="text"
          required
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          placeholder="Image url"
          onChange={(e) => {
            this.changeHandler(e);
          }}
        />

        <label
          className="newMovie__label"
          htmlFor="imdbUrl"
        >
          IMDb url
        </label>
        <input
          className="newMovie__input"
          type="text"
          required
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          placeholder="IMDb url"
          onChange={(e) => {
            this.changeHandler(e);
          }}
        />

        <label
          className="newMovie__label"
          htmlFor="imdbId"
        >
          IMDb id
        </label>
        <input
          className="newMovie__input"
          type="text"
          required
          name="imdbId"
          id="imdbId"
          value={imdbId}
          placeholder="IMDb id"
          onChange={(e) => {
            this.changeHandler(e);
          }}
        />

        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
