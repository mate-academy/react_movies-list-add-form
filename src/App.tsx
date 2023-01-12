import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [moviesArray, setMoviesArray] = useState([...moviesFromServer]);

  const onFormSubmit = (movie: Movie) => {
    setMoviesArray([
      ...moviesArray,
      movie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesArray} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onFormSubmit} />
      </div>
    </div>
  );
};
