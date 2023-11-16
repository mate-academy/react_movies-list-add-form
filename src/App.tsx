import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesRender, setMoviesRender] = useState(moviesFromServer);

  function addMovie(movie: Movie) {
    setMoviesRender(prevMovies => [...prevMovies, movie]);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesRender} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie) => addMovie(movie)} />
      </div>
    </div>
  );
};
