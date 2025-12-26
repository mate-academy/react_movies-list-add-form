import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleAddMovie = (movie: Movie) => {
    setMovies(prevMovies => [...prevMovies, movie]);
  };

  return (
    <div className="container">
      <NewMovie onAdd={handleAddMovie} />
      <MoviesList movies={movies} />
    </div>
  );
};
