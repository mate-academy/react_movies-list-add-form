import React, { Component } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

import './App.scss';

export class App extends Component {
  state = {
    movies: moviesFromServer,
  };

  onAdd = (movie) => {
    this.setState({
      movies: [
        ...moviesFromServer,
        movie,
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
          <NewMovie onAdd={this.onAdd} />
        </div>
      </div>
    );
  }
}
