// src/App.tsx
import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleAddMovie = (newMovie: Omit<Movie, 'id'>) => {
    const movieWithId: Movie = {
      ...newMovie,
      id: Date.now(), // Add ID for new movies
    };

    setMovies(prevMovies => [...prevMovies, movieWithId]);
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
