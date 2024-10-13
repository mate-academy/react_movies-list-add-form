import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useEffect, useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [currentMovies, setCurrentMovies] = useState<Movie[]>(moviesFromServer);
  const [newMovie, setNewMovie] = useState<Movie[] | []>([]);

  useEffect(() => {
    if (newMovie.length > 0) {
      setCurrentMovies(prevMovies => [...prevMovies, ...newMovie]);
      setNewMovie([]);
    }
  }, [newMovie]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={currentMovies} />
      </div>
      <div className="sidebar">
        <NewMovie setNewMovie={setNewMovie} />
      </div>
    </div>
  );
};
