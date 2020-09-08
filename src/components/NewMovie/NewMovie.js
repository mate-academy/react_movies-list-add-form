import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    // movies: this.props.movies,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  stateCleaner = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  changeHandler = (inputField) => {
    this.setState({
      [inputField.name]: inputField.value,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const { addMovie } = this.props;

    return (
      <form
        className="newMovieAdder"
        onSubmit={(event) => {
          addMovie(this.state, event);
          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }
        }
      >
        <p className="newMovieAdder__header">Add new movie</p>
        <input
          name="title"
          placeholder="Movie name"
          value={title}
          className="newMovieAdder__input"
          onChange={event => this.changeHandler(event.target)}
          required
        />
        <textarea
          name="description"
          placeholder="Movie descrition"
          value={description}
          className="newMovieAdder__input newMovieAdder__input--textarea"
          onChange={event => this.changeHandler(event.target)}
          required
        />
        <input
          type="url"
          name="imgUrl"
          placeholder="Movie imgUrl"
          value={imgUrl}
          className="newMovieAdder__input"
          onChange={event => this.changeHandler(event.target)}
          required
        />
        <input
          type="url"
          name="imdbUrl"
          placeholder="Movie imdbUrl"
          value={imdbUrl}
          className="newMovieAdder__input"
          onChange={event => this.changeHandler(event.target)}
          required
        />
        <input
          name="imdbId"
          placeholder="Movie imdbId"
          value={imdbId}
          className="newMovieAdder__input"
          onChange={event => this.changeHandler(event.target)}
          required
        />
        <button
          type="submit"
          className="newMovieAdder__submit-btn"
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
