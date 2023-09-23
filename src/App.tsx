import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [actualMovies, setActualMovies] = useState([...moviesFromServer]);

  const addMovie = (movie: Movie) => {
    setActualMovies([...actualMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={actualMovies} />
      </div>
      <div className="sidebar">
        <NewMovie addMovie={addMovie} />
      </div>
    </div>
  );
};
