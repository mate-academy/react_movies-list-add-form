import React, { Component } from 'react';
import './NewMovie.scss';

import cn from 'classnames';

import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onAdd = (event) => {
    event.preventDefault();

    this.props.onAddMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <section className="add-movie">
        <h2 className="add-movie__title">
          Adding a movie to the list
        </h2>

        <form
          className="add-movie__movie-form movie-form"
          action=""
          method="POST"
          onSubmit={event => this.onAdd(event)}
        >
          <label
            htmlFor="movieTitle"
            className="movie-form__subtitle"
          >
            Add a movie title:
          </label>
          <input
            className="movie-form__input movie-form__add-title"
            type="text"
            name="title"
            id="movieTitle"
            value={title}
            placeholder="Title"
            autoComplete="off"
            onChange={event => this.setState({ title: event.target.value })}
            required
          />

          <label
            htmlFor="movieDescription"
            className="movie-form__subtitle"
          >
            Add a movie description:
          </label>
          <textarea
            className="movie-form__input movie-form__add-description"
            type="text"
            name="description"
            id="movieDescription"
            value={description}
            placeholder="Description"
            autoComplete="off"
            rows="5"
            onChange={event => this.setState({
              description: event.target.value,
            })}
          />

          <label
            htmlFor="movieImgUrl"
            className="movie-form__subtitle"
          >
            Add a link for a movie poster:
          </label>
          <input
            className="movie-form__input movie-form__add-img-url"
            type="url"
            name="imgUrl"
            id="movieImgUrl"
            value={imgUrl}
            placeholder="Link for a movie poster"
            autoComplete="off"
            onChange={event => this.setState({
              imgUrl: event.target.value,
            })}
            required
          />

          <label
            htmlFor="movieImdbUrl"
            className="movie-form__subtitle"
          >
            Add a link to a movie page on IMDB:
          </label>
          <input
            className="movie-form__input movie-form__add-imdb-url"
            type="url"
            name="imdbUrl"
            id="movieImdbUrl"
            value={imdbUrl}
            placeholder="Link to a movie page on IMDB"
            autoComplete="off"
            onChange={event => this.setState({
              imdbUrl: event.target.value,
            })}
            required
          />

          <label
            htmlFor="movieImdbId"
            className="movie-form__subtitle"
          >
            Add an IMDB Id:
          </label>
          <input
            className="movie-form__input movie-form__add-imdb-id"
            type="text"
            name="imdbUrl"
            id="movieImdbId"
            value={imdbId}
            placeholder="IMDB Id"
            autoComplete="off"
            onChange={event => this.setState({
              imdbId: event.target.value,
            })}
            required
          />

          <button
            type="submit"
            className={cn('movie-form__button', {
              'movie-form__button--disabled':
              !title || !imgUrl || !imdbUrl || !imdbId,
            })}
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add movie
          </button>

        </form>
      </section>
    );
  }
}

NewMovie.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};
