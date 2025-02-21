import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [filmList, setFilmList] = useState(moviesFromServer);

  const onAdd = (filmToAdd: Movie) => {
    setFilmList(prevFilmList => [...prevFilmList, filmToAdd]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={filmList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
