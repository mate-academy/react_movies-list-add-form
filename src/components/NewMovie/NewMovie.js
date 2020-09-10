import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  submitHandler = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trim(),
    });
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={event => this.submitHandler(event)}
      >
        <label htmlFor="movie_title">Movie title</label>
        <input
          type="text"
          id="movie_title"
          name="title"
          required
          value={this.state.title}
          onChange={this.onChangeHandler}
        />

        <label htmlFor="movie_description">Movie description</label>
        <input
          type="text"
          id="movie_description"
          required
          name="description"
          value={this.state.description}
          onChange={this.onChangeHandler}
        />

        <label htmlFor="movie_poster">Movie poster</label>
        <input
          type="url"
          id="movie_poster"
          required
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.onChangeHandler}
        />

        <label htmlFor="movie_link">Movie IMDb link</label>
        <input
          type="url"
          id="movie_link"
          required
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.onChangeHandler}
        />

        <label htmlFor="movie_id">Movie IMDb ID</label>
        <input
          type="text"
          id="movie_id"
          required
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.onChangeHandler}
        />

        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
