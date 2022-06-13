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
    movies: [...moviesFromServer],
  };

  addMovie = (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
  ) => {
    this.setState(prevState => ({
      movies: [...prevState.movies, {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      }],
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
          <NewMovie addMovie={this.addMovie} movies={movies} />
        </div>
      </div>
    );
  }
}
