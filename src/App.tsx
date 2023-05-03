import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [newMovies, setNewMovies] = useState(moviesFromServer);

  const hendleAddNewFilm = (movie: Movie) => {
    setNewMovies([...newMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={hendleAddNewFilm} />
      </div>
    </div>
  );
};
