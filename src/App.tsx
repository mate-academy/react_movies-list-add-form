import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [copyOfMovies, setCopyOfMovies] = useState([...moviesFromServer]);

  const onAddMoive = (newMovie: Movie) => {
    setCopyOfMovies(movies => [...movies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={copyOfMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAddMoive} />
      </div>
    </div>
  );
};
