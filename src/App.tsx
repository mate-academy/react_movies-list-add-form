import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

const initialState: Movie[] = moviesFromServer.map(el => el);

export const App = () => {
  const [movies, setMovies] = useState(initialState);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(newMovie: Movie): void => {
            setMovies(prev => [...prev, newMovie]);
          }}
        />
      </div>
    </div>
  );
};
