import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  addMovie = (e, movie, func) => {
    e.preventDefault();
    this.setState(prev => ({
      movies: [
        ...prev.movies,
        movie,
      ],
    }));
    func();
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <h2 className="subtitle">Add movie form</h2>
          <NewMovie onAdd={(e, movie, func) => this.addMovie(e, movie, func)} />
        </div>
      </div>
    );
  }
}
