import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [newMovieList, setNewMovieList] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(setNewMovieList)} />
      </div>
    </div>
  );
};
