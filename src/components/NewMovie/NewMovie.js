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
  };

  handleChange = (event) => {
    const { target: { name, value } } = event;

    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
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
            value={title}
            placeholder="write the title"
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
            value={description}
            placeholder="write the description"
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
            value={imdbUrl}
            placeholder="paste the link to IMDB"
          />
        </label>
        <label>
          <span className="label">
            Description:
          </span>
          <input
            type="textarea"
            name="imdbId"
            onChange={event => this.handleChange(event)}
            value={imdbId}
            placeholder="paste the IMDB ID"
          />
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
