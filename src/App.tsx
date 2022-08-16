import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [data, setData] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => (
    setData((movies) => [...movies, movie])
  );

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={data} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
