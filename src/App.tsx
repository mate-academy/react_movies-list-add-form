import './App.scss';
import { useState } from 'react';
import { Movie } from './types/Movie';
import { NewMovie } from './components/NewMovie';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movie, setMovie] = useState(moviesFromServer);

  const addNewMovie = (newMovie: Movie) => (
    setMovie((movies) => (
      [...movies, newMovie]
    ))
  );

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
