import React from 'react';
import './App.scss';
import moviesFromServer from './api/movies.json';
import { MoviesList } from './components/MoviesList/MoviesList';
import { NewMovie } from './components/NewMovie';

interface State {
  movies: Movie[];
}

export class App extends React.Component<{}, State> {
  state: State = {
    movies: moviesFromServer,
  };

  addMovie = (movie: Movie) => {
    this.setState(prevState => ({
      movies: [movie, ...prevState.movies],
    }));
  };

  render() {
    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={this.state.movies} />
        </div>
        <div className="sidebar">
          <NewMovie addMovie={this.addMovie} />
        </div>
      </div>
    );
  }
}
