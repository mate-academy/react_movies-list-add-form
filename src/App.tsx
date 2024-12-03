import './App.scss';
import { NewMovie } from './components/NewMovie';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([...moviesFromServer]);

  const AddMovie = (movie: Movie) => {
    setMovies(prevState => [...prevState, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={AddMovie} />
      </div>
    </div>
  );
};
