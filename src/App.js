import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: [...moviesFromServer],
  };

  addMovie = (newMovie) => {
    this.setState(({ movies }) => ({
      movies: [...movies, newMovie],
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
          <NewMovie movies={this.state.movies} addMovie={this.addMovie} />
        </div>
      </div>
    );
  }
}
