import { useState } from 'react';

import './App.scss';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [visiableMovies, setVisiableMovies] = useState<Movie[]>([
    ...moviesFromServer,
  ]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visiableMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            setVisiableMovies([...visiableMovies, movie]);
          }}
        />
      </div>
    </div>
  );
};
