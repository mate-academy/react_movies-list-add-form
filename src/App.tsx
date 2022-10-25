import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [Movies, addMovie] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={Movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={addMovie}
          Movies={Movies}
        />
      </div>
    </div>
  );
};
