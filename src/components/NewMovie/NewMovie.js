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

  createMovie = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="create-movie"
        onSubmit={this.handleSubmit}
      >
        <input
          id="title"
          name="title"
          className="create-movie__title"
          type="text"
          placeholder="Type title here"
          value={title}
          onChange={this.createMovie}
          required
        />
        <input
          id="imgUrl"
          name="imgUrl"
          className="create-movie__imgUrl"
          type="text"
          value={imgUrl}
          placeholder="Type imgUrl here"
          onChange={this.createMovie}

          required
        />
        <input
          id="imdbUrl"
          name="imdbUrl"
          className="create-movie__imdbUrl"
          type="text"
          value={imdbUrl}

          placeholder="Type imdbUrl here"
          onChange={this.createMovie}
          required
        />
        <input
          id="imdbId"
          name="imdbId"
          className="create-imdbId"
          type="text"
          value={imdbId}
          placeholder="Type imdbId here"
          onChange={this.createMovie}
          required
        />
        <textarea
          id="description"
          name="description"
          className="create-movie__description"
          type="text"
          value={description}
          placeholder="Type description here"
          onChange={this.createMovie}
          row="10"
          required
        />
        <button
          type="submit"
        >
          Create
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
