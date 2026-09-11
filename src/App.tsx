import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';
export const App = () => {
  const [upgrededMovies, setUpgrededMovies] =
    useState<Movie[]>(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={upgrededMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            setUpgrededMovies(prev => [...prev, movie]);
          }}
        />
      </div>
    </div>
  );
};
