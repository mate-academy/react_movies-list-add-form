import './App.scss';
import { useState } from 'react';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [formCount, setFormCount] = useState(0);

  const addMovie = (newMovie: Movie): void => {
    setMovies([...movies, newMovie]);
    setFormCount(num => num + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} key={formCount} />
      </div>
    </div>
  );
};
