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
    this.setState(prev => ({
      movies: [...prev.movies, movie],
    }));
  };

  render() {
    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={this.state.movies} />
        </div>
        <div className="sidebar">
          <NewMovie onAdd={this.addMovie} />
        </div>
      </div>
    );
  }
}
