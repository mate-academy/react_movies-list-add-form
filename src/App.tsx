import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { useState } from 'react';

type Movie = {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description?: string;
};


export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie}/>
      </div>
    </div>
  );
};
