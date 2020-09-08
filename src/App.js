import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  addMovie = (movie, event) => {
    // put your code here
    event.preventDefault();
    this.setState(state => ({
      movies: [
        ...state.movies,
        movie,
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
          <NewMovie movies={movies} addMovie={this.addMovie} />
        </div>
      </div>
    );
  }
}
