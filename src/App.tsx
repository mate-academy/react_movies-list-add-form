import { useState } from 'react';

import './App.scss';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

const INITIAL_MOVIES_STATE: Movie[] = moviesFromServer.map(movie => ({
  ...movie,
}));

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES_STATE);

  const addMovie = (movie: Movie) => {
    setMovies(prevMovies => [
      ...prevMovies,
      {
        ...movie,
      },
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
