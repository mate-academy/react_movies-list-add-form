import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  type Movie = {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  };

  const handleAddMovie = (movie: Movie) => {
    setMovies([...movies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
