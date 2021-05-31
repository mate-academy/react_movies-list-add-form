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

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  submitHandler = (event) => {
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
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);

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
        className="form"
        onSubmit={this.submitHandler}
      >
        <input
          className="form__input"
          type="text"
          name="title"
          placeholder="Title of a Movie"
          value={title}
          onChange={this.inputHandler}
        />
        <input
          className="form__input"
          type="text"
          name="imgUrl"
          placeholder="Image URL"
          value={imgUrl}
          onChange={this.inputHandler}
        />
        <input
          className="form__input"
          type="text"
          name="imdbUrl"
          placeholder="IMDb URL"
          value={imdbUrl}
          onChange={this.inputHandler}
        />
        <input
          className="form__input"
          type="text"
          name="imdbId"
          placeholder="IMDb ID"
          value={imdbId}
          onChange={this.inputHandler}
        />
        <textarea
          className="form__description"
          type="text"
          name="description"
          placeholder="Description of a Movie"
          value={description}
          onChange={this.inputHandler}
        />
        <button
          className="form__button"
          type="submit"
        >
          Add a new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
