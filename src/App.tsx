import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

interface Movie {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
}

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleAdd = (movie: Movie) => {
    const newMovies = [
      ...movies,
      movie,
    ];

    setMovies(newMovies);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => handleAdd(movie)}
        />
      </div>
    </div>
  );
};
