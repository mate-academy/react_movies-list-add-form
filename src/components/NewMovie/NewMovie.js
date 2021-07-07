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
    error: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trimLeft(),
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

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      this.setState({
        error: true,
      });

      return;
    }

    this.props.handleAddMovie({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      error: false,
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      error,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <h2 className="form__title">Add new movie here</h2>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form__input"
          id="title"
          name="title"
          value={title}
          placeholder="Input movie title"
          onChange={this.handleChange}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form__input"
          id="description"
          name="description"
          value={description}
          placeholder="Describe the movie"
          onChange={this.handleChange}
        />

        <label htmlFor="imgUrl">Img Url</label>
        <input
          type="text"
          className="form__input"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          placeholder="Link for picture"
          onChange={this.handleChange}
        />

        <label htmlFor="imdbUrl">Imdb Url</label>
        <input
          type="text"
          className="form__input"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Place for IMDb link"
          onChange={this.handleChange}
        />

        <label htmlFor="imdbId">Imdb Id</label>
        <input
          type="text"
          className="form__input"
          id="imdbId"
          name="imdbId"
          value={imdbId}
          placeholder="Type IMDb id here"
          onChange={this.handleChange}
        />

        {error && (
          <span className="form__error">
            All fields must be filled
          </span>
        )}

        <button type="submit" className="form__button">
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  handleAddMovie: PropTypes.func.isRequired,
};
