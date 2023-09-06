import { useState } from 'react';

import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesList, setMoviesList] = useState<Movie[]>(moviesFromServer);

  const handleSetMoviesList = (movie: Movie) => {
    setMoviesList(prevList => [...prevList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleSetMoviesList} />
      </div>
    </div>
  );
};
