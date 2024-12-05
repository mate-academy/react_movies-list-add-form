import './App.scss';
import { MoviesList } from './components/MoviesList';
import { useState } from 'react';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => {
            setMovies([...movies, movie]);
          }}
        />
      </div>
    </div>
  );
};
