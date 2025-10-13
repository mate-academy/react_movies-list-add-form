import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [currentList, setCurrentList] = useState(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setCurrentList(list => [...list, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={currentList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
