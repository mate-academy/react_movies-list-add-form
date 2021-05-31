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

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(movie);

    this.clearInputs();
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
        className="form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="Enter a title of the movie"
          value={title}
          onChange={this.handleChange}
          required
        />

        <input
          className="form-input"
          type="text"
          name="description"
          placeholder="Add some description"
          value={description}
          onChange={this.handleChange}
          required
        />

        <input
          className="form-input"
          type="url"
          name="imgUrl"
          placeholder="ImgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />

        <input
          className="form-input"
          type="url"
          name="imdbUrl"
          placeholder="ImdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />

        <input
          className="form-input"
          type="text"
          name="imdbId"
          placeholder="ImdbId"
          value={imdbId}
          onChange={this.handleChange}
          required
        />

        <button
          type="submit"
          className="form-button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
