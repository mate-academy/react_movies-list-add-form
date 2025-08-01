import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';
function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

const generateId = () => {
  return `movie-${getRandomDigits()}`;
};
export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const addMovies = (newMovie: Omit<Movie, 'id'>) => {
    const movieWithId: Movie = {
      ...newMovie,
      id: generateId(),
    };
    setMovies([...movies, movieWithId]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovies} />
      </div>
    </div>
  );
};
