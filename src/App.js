import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  addMovie = (title, imdbId, imdbUrl, imgUrl, description) => {
    const newMovie = {
      key: Date.now(),
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.setState(prevState => ({
      movies: [
        ...prevState.movies,
        newMovie,
      ],
    }));
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie onAdd={this.addMovie} />
        </div>
      </div>
    );
  }
}
