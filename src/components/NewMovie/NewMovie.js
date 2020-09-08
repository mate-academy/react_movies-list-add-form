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

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { addMovie } = this.props;

    addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trimLeft().replace(/\s{2,}/g, ' '),
    });
  };

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2 className="form__header">Put the form here</h2>

        <label htmlFor="title">Enter the name of movie</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form__input"
          required
          value={title}
          onChange={this.handleChange}
        />

        <label htmlFor="description">Enter description of movie</label>
        <textarea
          type="text"
          name="description"
          id="description"
          className="form__input"
          required
          value={description}
          onChange={this.handleChange}
        />

        <label htmlFor="imgUrl">Enter url address of image</label>
        <input
          type="url"
          name="imgUrl"
          id="imgUrl"
          className="form__input"
          required
          value={imgUrl}
          onChange={this.handleChange}
        />

        <label htmlFor="imdbUrl">Enter imdbUrl</label>
        <input
          type="url"
          name="imdbUrl"
          id="imdbUrl"
          className="form__input"
          required
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <label htmlFor="imdbId">Enter imdbId</label>
        <input
          type="text"
          name="imdbId"
          id="imdbId"
          className="form__input"
          required
          value={imdbId}
          onChange={this.handleChange}
        />

        <button type="submit" className="form__button">
          Add new film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
