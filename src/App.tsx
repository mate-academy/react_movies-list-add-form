import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

const moviesOnPage = [...moviesFromServer];

export const App = () => {
  const [movies, setMovies] = useState(moviesOnPage);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie) => setMovies([...movies, movie])} />
      </div>
    </div>
  );
};
