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

  handleInput = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trimLeft(),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;

    addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add a new movie here</h2>

        <label className="form">
          Name:
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleInput}
          />
        </label>

        <label className="form">
          Description:
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={this.handleInput}
          />
        </label>

        <label className="form">
          Cover:
          <input
            type="url"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleInput}
          />
        </label>

        <label className="form">
          IMDb link:
          <input
            type="url"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleInput}
          />
        </label>

        <label className="form">
          IMDb id:
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleInput}
          />
        </label>

        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
