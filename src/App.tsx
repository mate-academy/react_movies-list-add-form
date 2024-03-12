import { useState } from 'react';
import './App.scss';
import { Movie } from './types/Movie';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

const initialMovies: Movie[] = moviesFromServer.map(movie => ({ ...movie }));

export const App = () => {
  const [movies, setMovies] = useState(initialMovies);

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
