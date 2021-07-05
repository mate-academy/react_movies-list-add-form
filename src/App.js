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
    const { movies } = this.state;

    this.setState({
      movies: [
        movie,
        ...movies,
      ],
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
          <p className="new__movie">Add new movie</p>
          <NewMovie
            onAdd={this.addMovie}
          />
        </div>
      </div>
    );
  }
}
