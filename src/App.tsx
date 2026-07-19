import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleAddMovie = (newMovie: Omit<Movie, 'id'>) => {
    setMovies(prevMovies => {
      const nextId = Math.max(...prevMovies.map(movie => movie.id), 0) + 1;

      return [
        ...prevMovies,
        {
          ...newMovie,
          id: nextId,
        },
      ];
    });
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
