import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  addMovie = (savedMovie) => {
    this.setState((prevState) => {
      return {
        movies: [...prevState.movies, savedMovie],
      };
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
          <h3 className="display-4 mb-4 text-center">Add movie</h3>
          <NewMovie addMovie={this.addMovie} />
        </div>
      </div>
    );
  }
}
