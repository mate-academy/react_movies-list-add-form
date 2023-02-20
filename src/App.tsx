import './App.scss';
import { useCallback, useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [listMovie, setListMovie] = useState(moviesFromServer);

  const addMovieInList = useCallback((movie: Movie) => {
    setListMovie([...listMovie, movie]);
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={listMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovieInList} />
      </div>
    </div>
  );
};
