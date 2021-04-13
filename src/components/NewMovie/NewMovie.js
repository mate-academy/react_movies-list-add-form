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
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (!title || !imdbId || !imdbUrl || !imgUrl) {
      return;
    }

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
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label>
          <p>Title</p>
          <input
            className="input"
            type="text"
            name="title"
            required
            value={title}
            onChange={this.handleInput}
          />
        </label>

        <label>
          <p>Description</p>
          <input
            className="input"
            type="text"
            name="description"
            value={description}
            onChange={this.handleInput}
          />
        </label>

        <label>
          <p>ImdbId</p>
          <input
            className="input"
            type="text"
            name="imdbId"
            required
            value={imdbId}
            onChange={this.handleInput}
          />
        </label>

        <label>
          <p>ImdbUrl</p>
          <input
            className="input"
            type="text"
            name="imdbUrl"
            required
            value={imdbUrl}
            onChange={this.handleInput}
          />
        </label>

        <label>
          <p>ImgUrl</p>
          <input
            className="input"
            type="text"
            name="imgUrl"
            required
            value={imgUrl}
            onChange={this.handleInput}
          />
        </label>

        <button
          className="button is-link is-outlined"
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
