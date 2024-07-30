import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [moviesDub, setMoviesDub] = useState([...moviesFromServer]);
  const onAdd = (movie: Movie) => {
    setMoviesDub(prevObj => {
      return [...prevObj, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesDub} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
