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
    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
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
        onSubmit={this.handleSubmit}
      >
        <label>
          Title
          <input
            className="new-movie__input"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Description
          <input
            className="new-movie__input"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          ImgUrl
          <input
            className="new-movie__input"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </label>
        <label>
          ImdbUrl
          <input
            className="new-movie__input"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </label>
        <label>
          imdbId
          <input
            className="new-movie__input"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
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
