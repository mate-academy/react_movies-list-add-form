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

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(movie);

    this.setState(state => ({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  };

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1 className="form__title">Add your movie</h1>
        <input
          className="form__input"
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Write title here"
          required
        />
        <textarea
          className="form__input form__textarea"
          name="description"
          value={description}
          onChange={this.handleChange}
          placeholder="Write description here"
          required
        />
        <input
          className="form__input"
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          placeholder="Write imgUrl here"
          required
        />
        <input
          className="form__input"
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          placeholder="Write imdbUrl here"
          required
        />
        <input
          className="form form__input"
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          placeholder="Write imdbId here"
          required
        />
        <button className="form__button" type="submit">
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
