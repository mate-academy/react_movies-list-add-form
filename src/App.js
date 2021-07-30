import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

const moviesKey = 'movies';

export class App extends Component {
  moviesFromServer = JSON.parse(window.localStorage.getItem(moviesKey));

  state = {
    movies: this.moviesFromServer || moviesFromServer,
  };

  addMovie = (movie) => {
    this.setState(
      prevState => ({
        movies: [
          ...prevState.movies,
          {
            ...movie,
            id: prevState.movies.length + 1,
          },
        ],
      }),
    );
    const stringifiedMovies = JSON.stringify([...this.state.movies, movie]);

    window.localStorage.setItem(moviesKey, stringifiedMovies);
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
