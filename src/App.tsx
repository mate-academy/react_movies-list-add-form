import React, { useState, useCallback, memo } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = memo(() => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);
  const addMovie = useCallback((newMovie: Movie) => {
    setMoviesList(currentMoviesList => [...currentMoviesList, newMovie]);
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
});
