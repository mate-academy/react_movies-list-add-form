import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [newMoviesList, setNewMoviesList] = useState<Movie[]>(moviesFromServer);
  const addMovie = (newMovie: Movie) => {
    setNewMoviesList((currentMoviesList: Movie[]) => [
      ...currentMoviesList,
      newMovie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMoviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onSubmit={addMovie} />
      </div>
    </div>
  );
};
