import React, { Component } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  addMovie = (movie) => {
    this.setState(prevState => ({
      movies: [
        ...prevState.movies,
        {
          ...movie,
        },
      ],
    }));
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie onSubmit={this.addMovie} />
        </div>
      </div>
    );
  }
}
