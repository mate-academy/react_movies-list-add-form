import { useState } from 'react';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

import './App.scss';

export const App = () => {
  const [newMovies, setNewMovies] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovies} />
      </div>

      <div className="sidebar">
        <NewMovie
          onAdd={(movie) => setNewMovies([...newMovies, movie])}
        />
      </div>
    </div>
  );
};
