import './App.scss';
import React, { useState, useCallback } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);

  const addNewMovie = useCallback((newMovie: Movie) => {
    setMoviesList(prevMoviesList => [...prevMoviesList, newMovie]);
  }, [moviesList]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
