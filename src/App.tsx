import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [add, onAdd] = useState<Movie[]>(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={add} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(newMovie) => {
          onAdd(([...add, newMovie]));
        }}
        />
      </div>
    </div>
  );
};
