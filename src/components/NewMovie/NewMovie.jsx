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

  updateValue = (key, value) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  }

  createMovie = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
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
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.createMovie}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form__input"
          value={title}
          name="title"
          onChange={(event => this.updateValue('title', event.target.value))}
          required
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form__input"
          value={description}
          name="description"
          onChange={
            (event => this.updateValue('description', event.target.value))
          }
        />

        <label htmlFor="imgUrl">ImgUrl</label>
        <input
          type="text"
          className="form__input"
          value={imgUrl}
          name="imgUrl"
          onChange={(event => this.updateValue('imgUrl', event.target.value))}
          required
        />

        <label htmlFor="imdbUrl">ImdbUrl</label>
        <input
          type="text"
          className="form__input"
          value={imdbUrl}
          name="imdbUrl"
          onChange={(event => this.updateValue('imdbUrl', event.target.value))}
          required
        />

        <label htmlFor="imdbId">ImdbId</label>
        <input
          type="text"
          className="form__input"
          value={imdbId}
          name="imdbId"
          onChange={(event => this.updateValue('imdbId', event.target.value))}
          required
        />

        <button
          type="submit"
          className="form__button"
        >
          Add new Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
