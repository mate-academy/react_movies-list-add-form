import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

// The movies from the server have an ID, let's define a type for them
type MovieWithId = Movie & { id: number };

export const App = () => {
  const [movies, setMovies] = useState<MovieWithId[]>(moviesFromServer);
  const [formKey, setFormKey] = useState(0);

  const handleAddMovie = (newMovie: Movie) => {
    // generate new ID
    const movieWithId: MovieWithId = { ...newMovie, id: Date.now() };

    // refresh film list
    setMovies(prev => [...prev, movieWithId]);

    // update key to reset form NewMovie
    setFormKey(prev => prev + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie key={formKey} onAddMovie={handleAddMovie} />
      </div>
    </div>
  );
};
