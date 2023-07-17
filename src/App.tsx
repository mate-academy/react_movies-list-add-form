import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [preparedMovies, setPreparedMovies] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={preparedMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie: Movie) => {
          setPreparedMovies([...preparedMovies, movie]);
        }}
        />
      </div>
    </div>
  );
};
