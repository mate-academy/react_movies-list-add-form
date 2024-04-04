import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [newMovieList, setNewMoviesList] = useState<Movie[]>(moviesFromServer);

  const hendlerAddMovie = (movie: Movie) => {
    setNewMoviesList([...newMovieList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovieList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => {
            hendlerAddMovie(movie);
          }}
        />
      </div>
    </div>
  );
};
