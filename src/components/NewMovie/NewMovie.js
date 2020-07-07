import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imdbId: '',
    imdbUrl: '',
    imgUrl: '',
  };

  getMovieData = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submit = (event) => {
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

    this.setState({
      title: '',
      description: '',
      imdbId: '',
      imdbUrl: '',
      imgUrl: '',
    });

    const movieData = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    return (
      this.props.addMovie(event, movieData)
    );
  }

  render() {
    const pattern = {
      imgUrl: '(http(s?):\\/\\/)?(\\S)*\\.(?:jpg|gif|png)',
      imdbUrl: '(http(s?):\\/\\/)?(www.imdb.com\\/title\\/(.{2})\\w{7})(\\/)?$',
      imdbId: '(.{2})\\w{7}$',
    };

    return (
      <form
        className="addMovieForm"
        onSubmit={this.submit}
      >
        <label htmlFor="movieTitle">Enter a movie title:</label>
        <input
          name="title"
          id="movieTitle"
          type="text"
          value={this.state.title}
          onChange={event => this.getMovieData(event)}
          className="addMovieForm__element"
          required
        />

        <label htmlFor="movieDescription">Enter a movie description:</label>
        <textarea
          name="description"
          id="movieDescription"
          type="text"
          value={this.state.description}
          onChange={event => this.getMovieData(event)}
          className="addMovieForm__element"
          rows="5"
          required
        />

        <label
          htmlFor="moviePosterURL"
        >
          Enter a movie poster direct link:
        </label>
        <input
          name="imgUrl"
          id="moviePosterURL"
          type="text"
          value={this.state.imgUrl}
          onChange={event => this.getMovieData(event)}
          placeholder="site.com/img.png"
          className="addMovieForm__element"
          required
          pattern={pattern.imgUrl}
        />

        <label htmlFor="movieImdbURL">Enter a movie IMDB URL:</label>
        <input
          name="imdbUrl"
          id="movieImdbURL"
          type="text"
          value={this.state.imdbUrl}
          onChange={event => this.getMovieData(event)}
          placeholder="www.imdb.com/title/tt1234567"
          className="addMovieForm__element"
          required
          pattern={pattern.imdbUrl}
        />

        <label htmlFor="movieImdbID">Enter a movie IMDB id:</label>
        <input
          name="imdbId"
          id="movieImdbID"
          type="text"
          value={this.state.imdbId}
          onChange={event => this.getMovieData(event)}
          className="addMovieForm__element"
          placeholder="tt1234567"
          required
          pattern={pattern.imdbId}
        />

        <button
          type="submit"
          className="addMovieForm__submit"
        >
          Enter
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
