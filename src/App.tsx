import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [listOfMovies, setListOfMovies] = useState(moviesFromServer);

  const onAdd = (newMovie: Movie) => {
    setListOfMovies(list => [...list, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={listOfMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
