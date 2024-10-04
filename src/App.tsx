import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [movieCollection, setMovieCollection] =
    useState<Movie[]>(moviesFromServer);

  function handleAddMovie(movie: Movie) {
    setMovieCollection(movies => [...movies, movie]);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieCollection} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={movie => handleAddMovie(movie)} />
      </div>
    </div>
  );
};
