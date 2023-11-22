import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [allMovies, setAllMovies] = useState(moviesFromServer);

  function onAdd(newMovie: Movie) {
    setAllMovies([...allMovies, newMovie]);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={allMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie: Movie) => onAdd(movie)} />
      </div>
    </div>
  );
};
