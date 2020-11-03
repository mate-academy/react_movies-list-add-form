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
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    addMovie(title, description, imgUrl, imdbUrl, imdbId);
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
        className="ui form"
        name="movie"
        onSubmit={this.handleSubmit}
      >
        <label>
          Enter title
          <input
            className="ui input"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter description
          <input
            type="text"
            className="ui input"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter imgUrl
          <input
            type="text"
            className="ui input"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter imdbUrl
          <input
            type="text"
            className="ui input"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter imdbId
          <input
            type="number"
            className="ui input"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </label>
        <button
          type="submit"
          className="ui button"
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
