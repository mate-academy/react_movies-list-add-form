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

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { addMovie } = this.props;

    addMovie({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="new-movie"
        onSubmit={this.handleSubmit}
      >
        <h2 className="new-movie__heading">Add new movie</h2>
        <label htmlFor="title">Enter movie name:</label>
        <input
          className="new-movie__input"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="description">Enter movie description:</label>
        <textarea
          className="new-movie__input new-movie__input--textarea"
          name="description"
          id="description"
          value={description}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="imgUrl">Enter path to movie poster:</label>
        <input
          className="new-movie__input"
          type="url"
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="imdbUrl">Enter path to IMDB page of the movie:</label>
        <input
          className="new-movie__input"
          type="url"
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="imdbId">Enter movie&apos;s IMDB id:</label>
        <input
          className="new-movie__input"
          type="text"
          name="imdbId"
          id="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          required
        />
        <button
          type="submit"
          className="new-movie__submit"
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
