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
    const { handleSubmit, handleChange } = this;

    return (
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="title of movie"
          value={title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="description of movie"
          value={description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="imgUrl of movie"
          value={imgUrl}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl of movie"
          value={imdbUrl}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imdbId"
          placeholder="imdbId of movie"
          value={imdbId}
          onChange={handleChange}
          required
        />
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
