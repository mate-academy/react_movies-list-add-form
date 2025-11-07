import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  function trimMovie(movie: Movie): Movie {
    return {
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    };
  }

  const addMovie = (movie: Movie) => {
    setMovies(currentMovies => [...currentMovies, trimMovie(movie)]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
