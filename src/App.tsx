import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => setMovies(
            (prevState) => [...prevState, movie],
          )}
        />
        {/* onAdd = propsName, we pass a function to it that sets a new state with all previous movies + a new one from a filled form */}
      </div>
    </div>
  );
};
