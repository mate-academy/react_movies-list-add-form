import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [newMovies, setNewMovies] = useState<Movie[]>([]);

  const addNewMovie = (movie: Movie) => {
    setNewMovies([...newMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={[...moviesFromServer, ...newMovies]} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
