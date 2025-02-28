import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';
import './App.scss';

export const App = () => {
  const [filmList, setFilmList] = useState<Array<Movie>>(moviesFromServer);

  const handleFilmSubmit = (data: Movie) => {
    setFilmList(prevData => [...prevData, data]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={filmList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleFilmSubmit} />
      </div>
    </div>
  );
};
