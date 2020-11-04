import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import NewMovie from './components/NewMovie/NewMovie';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  addMovie = (title, description, imgUrl, imdbUrl, imdbId) => {
    // put your code here
    this.setState((state) => {
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      return {
        // eslint-disable-next-line
        movies: [...this.state.movies, newMovie],
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
