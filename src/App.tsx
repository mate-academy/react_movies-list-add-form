import './App.scss';
import { Movie } from './types/Movie';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [preparedMovies, setPreparedMovies] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setPreparedMovies(prevMovies => [...prevMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={preparedMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
