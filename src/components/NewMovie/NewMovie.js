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
  };

  handleMovieSubmit = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    this.props.addMovie({
      title: title.trim(),
      description: description.trim(),
      imgUrl,
      imdbUrl,
      imdbId: imdbId.trim(),
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  handleImgUrl = (event) => {
    this.setState({
      imgUrl: event.target.value,
    });
  }

  handleImdbUrl = (event) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  }

  handleImdbId = (event) => {
    this.setState({
      imdbId: event.target.value,
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
          id="title"
          value={title}
          onChange={this.handleTitle}
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
          value={description}
          id="description"
          onChange={this.handleDescription}
          className="movie-adder__input movie-adder__textarea"
        />
        <label
          htmlFor="imgUrl"
          className="movie-adder__label"
        >
          Movie imgUrl:
        </label>
        <input
          id="imgUrl"
          value={imgUrl}
          onChange={this.handleImgUrl}
          className="movie-adder__input"
        />
        <label
          htmlFor="imdbUrl"
          className="movie-adder__label"
        >
          Movie imdbUrl:
        </label>
        <input
          id="imdbUrl"
          value={imdbUrl}
          onChange={this.handleImdbUrl}
          className="movie-adder__input"
        />
        <label
          htmlFor="imdbId"
          className="movie-adder__label"
        >
          Movie imdbId:
        </label>
        <input
          id="imdbId"
          value={imdbId}
          onChange={this.handleImdbId}
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
