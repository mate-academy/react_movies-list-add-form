import { useState } from 'react';

import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { trimObjectStrings } from './utils';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);

  const handleAddMovie = (movie: Movie): void => {
    setMoviesList((prevState) => ([
      ...prevState,
      trimObjectStrings(movie),
    ]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
