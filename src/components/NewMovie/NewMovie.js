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
      [name]: value.replace(/ +/g, ' ').trim(),
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
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="title">
          <h3 className="form__heading">Movie title</h3>
          <input
            id="description"
            className="form__input"
            type="text"
            name="title"
            placeholder="Enter the description"
            value={title}
            autoComplete="off"
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="description">
          <h3 className="form__heading">Description</h3>
          <input
            id="description"
            className="form__input"
            name="description"
            placeholder="Enter the description"
            value={description}
            autoComplete="off"
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="imgUrl">
          <h3 className="form__heading">Poster</h3>
          <input
            id="imgUrl"
            className="form__input"
            name="imgUrl"
            placeholder="Add poster url"
            autoComplete="off"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="imdbUrl">
          <h3 className="form__heading">IMDb</h3>
          <input
            id="imdbUrl"
            className="form__input"
            name="imdbUrl"
            placeholder="Add url to IMDb"
            value={imdbUrl}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imdbId">
          <h3 className="form__heading">IMDb id</h3>
          <input
            id="imdbUrl"
            className="form__input"
            name="imdbId"
            placeholder="Add url to IMDb"
            value={imdbId}
            autoComplete="off"
            onChange={this.handleChange}
          />
        </label>

        <button
          className="form__button"
          type="submit"
        >
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
