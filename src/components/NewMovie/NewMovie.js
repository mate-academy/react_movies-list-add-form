import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.css';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }

  setMovieTitle = (value) => {
    this.setState({
      title: value,
    });
  }

  setMovieDescription = (value) => {
    this.setState({
      description: value,
    });
  }

  setMovieImage = (value) => {
    this.setState({
      imgUrl: value,
    });
  }

  setMovieImdb = (value) => {
    this.setState({
      imdbUrl: value,
    });
  }

  setMovieImdbId = (value) => {
    this.setState({
      imdbId: value,
    });
  }

  handleSubmit = (event) => {
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

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <input
          required
          placeholder="Add movie title"
          onChange={event => this.setMovieTitle(event.target.value)}
          value={this.state.title}
        />
        <textarea
          required
          placeholder="Add movie description"
          onChange={event => this.setMovieDescription(event.target.value)}
          value={this.state.description}
        />
        <input
          required
          placeholder="Add movie image URL"
          onChange={event => this.setMovieImage(event.target.value)}
          value={this.state.imgUrl}
        />
        <input
          required
          placeholder="Add movie Imbd"
          onChange={event => this.setMovieImdb(event.target.value)}
          value={this.state.imdbUrl}
        />
        <input
          required
          placeholder="Add movie Imdb id"
          onChange={event => this.setMovieImdbId(event.target.value)}
          value={this.state.imdbId}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
