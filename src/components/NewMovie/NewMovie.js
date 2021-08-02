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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { addMovie } = this.props;
    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(movie);

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
      <form
        className="form-container"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Please enter the title of the movie"
          value={title}
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          placeholder="Write a short description of the movie"
          rows="10"
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="Write a link to the movie poster"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="Write the IMDB link for the movie"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          placeholder="Write the IMDB ID of the movie"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="button"
        >
          Add your movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
