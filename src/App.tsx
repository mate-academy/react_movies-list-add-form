import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { Movie } from './types/Movie';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [actualMovies, setActualMovies] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setActualMovies([...actualMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={actualMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
