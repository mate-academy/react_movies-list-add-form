import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [allMovies, setAllMovies] = useState(moviesFromServer);
  const onAdd = (movie: Movie) => {
    setAllMovies([...allMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={allMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
