import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [allMovies, setAllMovies] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={allMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => {
            setAllMovies([...allMovies, movie]);
          }}
        />
      </div>
    </div>
  );
};
