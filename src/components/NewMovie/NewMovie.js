import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    form: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state.form);

    this.setState({
      form: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      form: {
        [name]: value,
      },
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.form;

    return (
      <form
        className="movie-form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter the title"
          className="movie-form__input"
          value={title}
          onChange={this.handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Enter the description"
          className="movie-form__input"
          value={description}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="Enter the imgUrl"
          className="movie-form__input"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="Enter the imdbUrl"
          className="movie-form__input"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="imdbId"
          placeholder="Enter the imdbId"
          className="movie-form__input"
          value={imdbId}
          onChange={this.handleChange}
          required
        />
        <button type="submit" className="movie-form__btn">
          Save
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
