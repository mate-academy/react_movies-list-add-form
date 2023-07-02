import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [moviesList, setMoviesList] = useState([...moviesFromServer]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(newMovie) => setMoviesList([...moviesList, newMovie])}
        />
      </div>
    </div>
  );
};
