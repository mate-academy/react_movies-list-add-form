import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movieFromServer, setMovieFromServer] = useState(moviesFromServer);
  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieFromServer} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            setMovieFromServer(prev => [...prev, movie]);
          }}
        />
      </div>
    </div>
  );
};
