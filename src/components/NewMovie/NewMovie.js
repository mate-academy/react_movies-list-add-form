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
    event.preventDefault();

    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    const newMovie = {
      title,
      description: description || 'No description',
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);
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
      <>
        <form id="addMovie" onSubmit={this.handleSubmit}>
          <h1 className="form-title">
            Add movie to list
          </h1>
          <label className="form-label">
            Title:&nbsp;
            <input
              className="form-control"
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          <label className="form-label">
            Description:&nbsp;
            <input
              className="form-control"
              type="text"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </label>
          <label className="form-label">
            Image link:&nbsp;
            <input
              className="form-control"
              type="text"
              name="imgUrl"
              value={imgUrl}
              onChange={this.handleChange}
            />
          </label>
          <label className="form-label">
            IMDB link:&nbsp;
            <input
              className="form-control"
              type="text"
              name="imdbUrl"
              value={imdbUrl}
              onChange={this.handleChange}
            />
          </label>
          <label className="form-label">
            IMDB id:&nbsp;
            <input
              className="form-control"
              type="text"
              name="imdbId"
              value={imdbId}
              onChange={this.handleChange}
            />
          </label>
        </form>
        <button
          className="btn btn-primary"
          type="submit"
          form="addMovie"
        >
          Add movie
        </button>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
