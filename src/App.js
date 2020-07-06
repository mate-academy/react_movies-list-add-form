import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import filmsFromServer from './api/movies.json';

class App extends Component {
  state = {
    movies: filmsFromServer,
  };

  addMovie = (movie) => {
    this.setState((prevState) => {
      return {
        movies: [...prevState.movies, movie],
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
          <NewMovie addMovie={this.addMovie} />
        </div>
      </div>
    );
  }
}

export default App;
