import './App.scss';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';
import { useState } from 'react';

export const App = () => {
  const [existMovie, setExistMovie] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={existMovie} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={attachedMovie => {
            setExistMovie([...existMovie, attachedMovie]);
          }}
        />
      </div>
    </div>
  );
};
