import { useState } from 'react';
import './App.scss';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

export const App = () => {
  const [moviesOnSite, setMoviesOnSite] = useState(moviesFromServer);

  const addNewMovie = (newMovie: Movie) => {
    setMoviesOnSite((currentList => [
      ...currentList,
      newMovie,
    ]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesOnSite} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
