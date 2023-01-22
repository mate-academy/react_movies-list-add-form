import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);

  const addMovieHandler = (movie: Movie) => {
    setMoviesList((state) => {
      const newMovie = { ...movie };

      return [...state, newMovie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovieHandler} />
      </div>
    </div>
  );
};
