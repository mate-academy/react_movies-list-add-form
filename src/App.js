/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  addMovie = (movie) => {
    const movies = [...this.state.movies, movie];

    this.setState({ movies });
    document.querySelector('form').reset();
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
