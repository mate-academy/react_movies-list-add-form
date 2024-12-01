import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [addMovie, setAddMovie] = useState(moviesFromServer);

  const onAddNewMovie = (newMovie: Movie) => {
    setAddMovie(currentMovie => [...currentMovie, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={addMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAddNewMovie} />
      </div>
    </div>
  );
};
