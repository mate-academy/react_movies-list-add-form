import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export function createNewMovies(newMovie: Movie, movies: Movie[]) {
  const newMovies: Movie[] = [...movies, newMovie];

  return newMovies;
}

export const App = () => {
  const [newMovies, setNewMovies] = useState(moviesFromServer);
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => {
            setNewMovies(prev => createNewMovies(movie, prev));
            setCount(prev => prev + 1);
          }}
          countForm={count}
        />
      </div>
    </div>
  );
};
