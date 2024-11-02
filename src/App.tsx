import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from '../src/types/Movie';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);

  const handleAddingNewMovie = (newMovie: Movie) => {
    setMoviesList([...moviesList, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddingNewMovie} />
      </div>
    </div>
  );
};
