import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  };

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;
    const { addMovie } = this.props;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(newMovie);

    this.reset();
  }

  render() {
    const { title, description, imdbUrl, imdbId, imgUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Film title"
          value={title}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <button
          type="submit"
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
