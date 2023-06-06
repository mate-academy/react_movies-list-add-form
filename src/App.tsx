import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import './App.scss';

export const App = () => {
  const [newMovieList, setNewMovieList] = useState(moviesFromServer);

  const onAdd = (newMovieObj: Movie) => {
    setNewMovieList([...newMovieList, newMovieObj]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
