import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMovies, setVisibleMovies] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setVisibleMovies((state) => {
      const newMovie = {
        title: movie.title,
        description: movie.description,
        imgUrl: movie.imgUrl,
        imdbUrl: movie.imdbUrl,
        imdbId: movie.imdbId,
      };

      return (
        [
          ...state,
          newMovie,
        ]
      );
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie) => addMovie(movie)}
        />
      </div>
    </div>
  );
};
