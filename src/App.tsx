import React from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

interface State {
  movies: Movie[];
}

export class App extends React.Component<{}, State> {
  state: State = {
    movies: moviesFromServer,
  };

  addMovie = (movieObj:Movie) => {
    this.setState(
      state => ({
        movies: [...state.movies, movieObj],
      }),
    );
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <h3 className="page-tittle">To add a new movie fill the form</h3>
          <NewMovie addMovie={this.addMovie} />
        </div>
      </div>
    );
  }
}
