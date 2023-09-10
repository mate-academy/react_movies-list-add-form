import { useState } from 'react';
import moviesFromServer from './api/movies.json';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import './App.scss';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);
  const onAdd = (movie: Movie) => {
    setMoviesList([...moviesList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
