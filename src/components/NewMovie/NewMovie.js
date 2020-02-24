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

  handleUserInput = (evt) => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { onMovieAdded } = this.props;

    onMovieAdded({ ...this.state });

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
      <form
        className="ui form"
        onSubmit={this.handleFormSubmit}
      >
        <p className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleUserInput}
          />
        </p>
        <p className="form-group">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleUserInput}
          />
        </p>
        <p className="form-group">
          <input
            type="text"
            name="imgUrl"
            placeholder="Image URL"
            value={imgUrl}
            onChange={this.handleUserInput}
          />
        </p>
        <p className="form-group">
          <input
            type="text"
            name="imdbUrl"
            placeholder="IMDB URL"
            value={imdbUrl}
            onChange={this.handleUserInput}
          />
        </p>
        <p className="form-group">
          <input
            type="text"
            name="imdbId"
            placeholder="IMDB Id"
            value={imdbId}
            onChange={this.handleUserInput}
          />
        </p>
        <button
          className="ui button"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onMovieAdded: PropTypes.func.isRequired,
};
