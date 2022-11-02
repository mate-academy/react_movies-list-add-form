import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const [count, setCount] = useState(0);

  const onAdd = (movie: Movie) => {
    setMovies([...movies, movie]);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
      <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
      <NewMovie onAdd={onAdd} key={count} />
      </div>
    </div>
  );
};
