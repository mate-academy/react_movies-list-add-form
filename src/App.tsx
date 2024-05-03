import { useState } from 'react';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import { Movie } from './types/Movie';

import moviesFromServer from './api/movies.json';

import './App.scss';

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie: Movie) => setMovies([...movies, movie])} />
      </div>
    </div>
  );
};
