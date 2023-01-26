import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movieList, setMovielist] = useState<Movie[]>(moviesFromServer);
  const [count, setCount] = useState(0);

  const addMovies = (newMovie: Movie) => {
    setMovielist((currentMovies) => [...currentMovies, newMovie]);
    setCount((currentCount) => currentCount + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovies} key={count} />
      </div>
    </div>
  );
};
