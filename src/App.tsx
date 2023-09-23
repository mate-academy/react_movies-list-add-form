import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [initialMovies, setInitialMovies] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={initialMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie) => {
            setInitialMovies([...initialMovies, movie]);
          }}
        />
      </div>
    </div>
  );
};
