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
    this.resetForm();
  }

  resetForm = () => {
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
        className="form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          className="input is-info"
          name="title"
          placeholder="Add a title"
          value={title}
          onChange={this.handleChange}
          required
        />
        <textarea
          type="text"
          className="textarea is-info"
          name="description"
          placeholder="Add a description"
          value={description}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          className="input is-info"
          name="imgUrl"
          placeholder="Add a link to movie poster"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          className="input is-info"
          name="imdbUrl"
          placeholder="Add an IMDb link"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          className="input is-info"
          name="imdbId"
          placeholder="Add an IMDb id"
          value={imdbId}
          onChange={this.handleChange}
          required
        />
        <button
          type="submit"
          className="button is-primary"
        >
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
