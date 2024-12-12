import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

// write code
export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const handleAddMovie = (newMovie: {
    title: string;
    description?: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => {
    setMovies(prevMovies => [newMovie, ...prevMovies]);
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
