import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [film, setFilm] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  function getMovies(movie: Movie): Movie[] {
    const values = Object.values(movie);

    if (values.every(value => value === '')) {
      return moviesFromServer;
    }

    moviesFromServer.push(movie);

    return moviesFromServer;
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={getMovies(film)} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie) => setFilm(movie)}
        />
      </div>
    </div>
  );
};
