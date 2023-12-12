import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const onAdd = (newMovie: any) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
