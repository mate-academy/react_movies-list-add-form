import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [prepMovies, setPrepMovies] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={prepMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie) => {
          setPrepMovies(currentMovies => [...currentMovies, movie]);
        }}
        />
      </div>
    </div>
  );
};
