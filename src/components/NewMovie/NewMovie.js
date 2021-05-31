import React from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends React.Component {
  state = {
    movie: {
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    },
    error: false,
  };

  handlerValue = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    const { movie } = this.state;
/* eslint-disable */
    for (const key in movie) {
      if (movie[key].trim().length === 0) {
        return this.setState({
          error: true,
        });
      }
    }

    this.props.onAdd(movie);

    for (const key in movie) {
      this.setState(state => ({
        movie: {
          ...state.movie,
          [key]: '',
        },
      }));
    }
/* eslint-disable */
    return this.setState({
      error: false,
    });
  }

  render() {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    } = this.state.movie;

    return (
      <form
        className="form"
        onSubmit={this.handlerSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={this.handlerValue}
        />

        <input
          type="text"
          name="imgUrl"
          placeholder="image url"
          value={imgUrl}
          onChange={this.handlerValue}
        />

        <input
          type="text"
          name="imdbUrl"
          placeholder="IMDb url"
          value={imdbUrl}
          onChange={this.handlerValue}
        />

        <input
          type="text"
          name="imdbId"
          placeholder="IMDb id"
          value={imdbId}
          onChange={this.handlerValue}
        />

        <textarea
          rows="4"
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={this.handlerValue}
        />
        {this.state.error && (
          <div className="error">
            Аll fields must be filled
          </div>
        )}
        <button
          className="form__button"
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
