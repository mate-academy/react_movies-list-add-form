import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {

  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  // const test = (movie:Movie) => {
  //   setMovies((prev: Movie[]):Movie[] => [...prev, movie]);
  // };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        {/* <NewMovie setMovies={setMovies} /> */}
        <NewMovie onAdd={(movie:Movie):void => setMovies([...movies, movie])} />
      </div>
    </div>
  );
};
