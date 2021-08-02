import React, { Component } from 'react';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

import './App.scss';

const moviesKey = 'movies';

export class App extends Component {
  moviesFromLocalStorage = JSON.parse(window.localStorage.getItem(moviesKey));

  state = {
    movies: this.moviesFromLocalStorage || moviesFromServer,
  };

  addMovie = (movie) => {
    this.setState(state => ({
      movies: [...state.movies, movie],
    }),
    () => {
      const stringifiedMovies = JSON.stringify(this.state.movies);

      window.localStorage.setItem(moviesKey, stringifiedMovies);
    });
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie addMovie={this.addMovie} />
        </div>
      </div>
    );
  }
}
