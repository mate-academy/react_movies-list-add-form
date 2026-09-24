import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
// import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  // const [newMovies, setNewMovies] = useState<Movie[] | []>([]);

  // const handleSubmit = (movs: Movie[]) => {
  //   setNewMovies([...newMovies, ...movs]);
  // };

  // handleSubmit([]);

  return (
    <div className="page">
      <div className="page-content">
        {/* <MoviesList movies={[...moviesFromServer, ...newMovies]} /> */}
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={movie => setMovies(prev => [...prev, movie])} />
      </div>
    </div>
  );
};
