import { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

type State = {
  movies: Movie[],
};

export class App extends Component {
  state: Readonly<State> = {
    movies: moviesFromServer,
  };

  addMovie = (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
  ) => {
    this.setState((state: Readonly<State>) => {
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      return {
        movies: [...state.movies, newMovie],
      };
    });
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
