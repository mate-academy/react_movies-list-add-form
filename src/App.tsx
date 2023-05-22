import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moives, setMoies] = useState(moviesFromServer);
  const addMoives = (movie: Movie) => {
    setMoies((actual) => [...actual, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moives} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMoives} />
      </div>
    </div>
  );
};
