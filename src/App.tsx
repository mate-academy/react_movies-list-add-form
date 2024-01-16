import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [preparedMovies, setPreparedMovies] = useState(moviesFromServer);
  // const addNewMovie

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={preparedMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie) => {
          setPreparedMovies(currentList => [...currentList, movie]);
        }}
        />
      </div>
    </div>
  );
};
