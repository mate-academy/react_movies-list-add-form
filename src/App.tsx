import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import React, { useReducer } from 'react';

// random comment
export const App = () => {
  const [, requestRerender] = useReducer(x => x + 1, 0);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesFromServer} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            moviesFromServer.push(movie);
            requestRerender();
          }}
        />
      </div>
    </div>
  );
};
