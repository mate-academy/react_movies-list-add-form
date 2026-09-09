import './App.scss';
import { useState } from 'react';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

const formattedInitialMovies: Movie[] = moviesFromServer;

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(formattedInitialMovies);
  const [count, setCount] = useState<number>(0);

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie count={count} onAddMovie={handleAddMovie} />
      </div>
    </div>
  );
};
