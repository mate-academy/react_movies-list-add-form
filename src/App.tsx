import './App.scss';
import { useState } from 'react';
import { Movie } from './react-app-env';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const addition = (movie: Movie) => (
    setMovies(prevList => [...prevList, movie])
  );

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addition} />
      </div>
    </div>
  );
};
