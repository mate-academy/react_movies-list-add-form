import React, { useCallback, useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [newMovie, setNewMovie] = useState(moviesFromServer);

  const addMovie = useCallback((movie: Movie) => {
    setNewMovie((prevListMovie) => {
      const newListMovie = movie;

      return [...prevListMovie, newListMovie];
    });
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie) => addMovie(movie)} />
      </div>
    </div>
  );
};
