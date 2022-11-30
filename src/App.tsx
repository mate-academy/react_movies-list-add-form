import './App.scss';
import { useState, useCallback } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const handleAddmovie = useCallback((
    {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    }: Movie,
  ) => {
    setMovies(prevMovies => (
      [
        ...prevMovies,
        {
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        },
      ]
    ));
  }, [movies]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddmovie} />
      </div>
    </div>
  );
};
