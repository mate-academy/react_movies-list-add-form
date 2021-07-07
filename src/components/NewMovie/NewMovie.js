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
    this.props.addMovie(this.state);
    this.reset();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.trimStart(),
    });
  }

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.handleChange}
          value={title}
          name="title"
          required
          placeholder="Movie title"
        />

        <input
          type="text"
          onChange={this.handleChange}
          value={description}
          name="description"
          placeholder="Movie description"
        />

        <input
          type="text"
          onChange={this.handleChange}
          value={imgUrl}
          name="imgUrl"
          required
          placeholder="Image URL"
        />

        <input
          type="text"
          onChange={this.handleChange}
          value={imdbUrl}
          name="imdbUrl"
          required
          placeholder="IMDB URL"
        />

        <input
          type="text"
          onChange={this.handleChange}
          value={imdbId}
          name="imdbId"
          placeholder="IMDB ID"
        />

        <button
          type="submit"
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
