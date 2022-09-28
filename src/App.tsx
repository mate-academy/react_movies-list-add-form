import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const [movieExists, setMovieExist] = useState(false);

  const addMovie = (movie: Movie) => {
    let hasMvoie;

    movies.forEach(movieFromList => {
      if (JSON.stringify(movieFromList) === JSON.stringify(movie)) {
        hasMvoie = true;
      }
    });

    if (!hasMvoie) {
      setMovies([...movies, movie]);
      setMovieExist(false);
    } else {
      setMovieExist(true);
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          movieExists={movieExists}
          addMovie={addMovie}
        />
      </div>
    </div>
  );
};
