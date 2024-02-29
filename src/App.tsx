import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [initialMovies, setInitialMovies] = useState(moviesFromServer);

  // console.table(initialMovies);

  return (
    <>
      <div className="page">
        <div className="page-content">
          <MoviesList movies={initialMovies} />
        </div>
        <div className="sidebar">
          <NewMovie
            onAdd={(movie: Movie) =>
              setInitialMovies([...initialMovies, movie])
            }
          />
        </div>
      </div>
    </>
  );
};
