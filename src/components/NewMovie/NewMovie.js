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

    this.setState({ [name]: value });
  };

  handleSumbit = (event) => {
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

    this.props.onAddMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form
        className="add-form"
        onSubmit={this.handleSumbit}
      >
        <input
          className="add-form__input"
          type="text"
          placeholder="title"
          name="title"
          value={this.state.title}
          required
          onChange={this.handleChange}
        />

        <textarea
          className="add-form__textarea"
          type="text"
          placeholder="description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <input
          className="add-form__input"
          type="text"
          placeholder="img Url"
          name="imgUrl"
          value={this.state.imgUrl}
          required
          onChange={this.handleChange}
        />

        <input
          className="add-form__input"
          type="text"
          placeholder="imdb Url"
          name="imdbUrl"
          value={this.state.imdbUrl}
          required
          onChange={this.handleChange}
        />

        <input
          className="add-form__input"
          type="text"
          placeholder="imdb Id"
          name="imdbId"
          value={this.state.imdbId}
          required
          onChange={this.handleChange}
        />

        <button
          className="add-form__button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};
