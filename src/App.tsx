import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [key, setKey] = useState('');

  const addMovie = (movie: Movie) => {
    const newKey = `tt${String((Number(movies[0].imdbId.slice(1)) + 1))}`;

    setMovies([...movies, movie]);
    setKey(newKey);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie key={key} onAdd={addMovie} movies={movies} />
      </div>
    </div>
  );
};
