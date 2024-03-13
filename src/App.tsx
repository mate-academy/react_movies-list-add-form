import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [newMovie, setNewMovie] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovie} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            setNewMovie(prev => [...prev, movie]);
          }}
        />
      </div>
    </div>
  );
};
