import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { NewMovie } from './components/NewMovie';

export const App = () => {
  const [movie, setMovie] = useState(moviesFromServer);

  const onAdd = (film: Movie) => {
    setMovie(curretMovie => [
      ...curretMovie, film,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
