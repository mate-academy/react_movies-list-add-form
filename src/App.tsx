import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie, type FormData } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';

export const App = () => {
  const [movies, setMovies] = useState<FormData[]>(moviesFromServer);
  const [newMovieKey, setNewMovieKey] = useState(0);
  const addMovie = (movie: FormData) => {
    setMovies((prevMovies: FormData[]) => [...prevMovies, movie]);

    setNewMovieKey((prevNewMovieKey: number) => prevNewMovieKey + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie key={newMovieKey} onAdd={addMovie} />
      </div>
    </div>
  );
};
