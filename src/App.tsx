import './App.scss';
import { useState } from 'react';
import { NewMovie } from './components/NewMovie';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesForRender, setMoviesForRender] = useState(moviesFromServer);

  const handleAdd = (movie: Movie) => {
    setMoviesForRender(curr => [...curr, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesForRender} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAdd} />
      </div>
    </div>
  );
};
