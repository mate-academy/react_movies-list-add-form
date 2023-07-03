import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [oldMovies, setOldMovies ] = useState(moviesFromServer);

  const addNewMovies = (newMovie: Movie) => {
    setOldMovies((newList => [
      ...newList,
      newMovie,
    ]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={oldMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovies} />
      </div>
    </div>
  );
};
