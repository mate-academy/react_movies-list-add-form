import { useState } from 'react';

import './App.scss';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMovies, setVisibleMovies] = useState(moviesFromServer);

  /* function addMovie(movie: Movie) {
    setVisibleMovies([...visibleMovies, movie]);
  } */

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => {
            setVisibleMovies([...visibleMovies, movie]);
          }}
        />
      </div>
    </div>
  );
};
