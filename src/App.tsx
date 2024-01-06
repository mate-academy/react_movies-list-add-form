import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie, MoviesProps } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState<MoviesProps[]>(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList
          movies={movies}
        />
      </div>
      <div className="sidebar">
        <NewMovie setMovies={setMovies} />
      </div>
    </div>
  );
};
