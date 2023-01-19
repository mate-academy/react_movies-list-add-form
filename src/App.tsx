import './App.scss';
import { useCallback, useState } from 'react';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [allMovies, setAllMovies] = useState(moviesFromServer);

  const onAdd = useCallback((movie: Movie) => {
    setAllMovies([...allMovies, movie]);
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={allMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
