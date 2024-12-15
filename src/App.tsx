import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import React, { useState, useCallback } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const visibleMovies = [...moviesFromServer];
  const [movies, setMovies] = useState<Movie[]>(visibleMovies);

  const addMovie = useCallback((newMovie: Movie) => {
    setMovies(currentMovies => {
      return [...currentMovies, newMovie];
    });
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={addMovie}
          movies={movies}
          errorMessage={''}
          titleErrorMessage={''}
        />
      </div>
    </div>
  );
};
