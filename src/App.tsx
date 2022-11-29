import { useCallback, useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import './App.scss';
import { Movie } from './types/Movie';

export const App = () => {
  const [filmList, setFilmList] = useState(moviesFromServer);

  const addMovie = useCallback(
    (movie: Movie) => {
      setFilmList([...filmList, movie]);
    },
    [filmList],
  );

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={filmList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
