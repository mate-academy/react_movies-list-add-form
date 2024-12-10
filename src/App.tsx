import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleAddMovie = (
    movie: Omit<Movie, 'imdbId'> & { description?: string },
  ) => {
    const newMovie: Movie = {
      ...movie,
      imdbId: `imdb-${Math.random().toString(36).substr(2, 9)}`, // Generate a unique ID for the movie
      description: movie.description ?? '', // Ensure description is not undefined
    };

    setMovies(prevMovies => [...prevMovies, newMovie]);
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
