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
    const { title, description, imgUrl, imdbUrl, imdbId } = movie;

    this.setState((state) => {
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      return {
        movies: [
          ...state.movies,
          newMovie,
        ],
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
          <NewMovie movies={movies} onAdd={this.addMovie} />
        </div>
      </div>
    );
  }
}
