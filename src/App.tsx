import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import React, { useState } from 'react';

const initialMovies: Movie[] = moviesFromServer.map(movie => ({
  ...movie,
}));

export const App: React.FC = () => {
  const [movies, setMovie] = useState<Movie[]>(initialMovies);

  const addMovie = (newMovie: Movie) => {
    setMovie(currentMovies => [...currentMovies, newMovie]);
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
