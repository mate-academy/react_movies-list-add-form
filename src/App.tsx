import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import type { MovieFormType } from './components/NewMovie';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);

  const handleAddNewMovie = (movie: MovieFormType) => {
    setMoviesList(prev => {
      return [...prev, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddNewMovie} />
      </div>
    </div>
  );
};
