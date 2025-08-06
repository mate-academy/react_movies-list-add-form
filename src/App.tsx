import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

const initialMovies: Movie[] = [
  {
    title: 'The Matrix',
    description:
      'A computer hacker learns about the true nature of his reality.',
    imgUrl: 'https://example.com/matrix.jpg',
    imdbUrl: 'https://www.imdb.com/title/tt0133093/',
    imdbId: 'tt0133093',
  },
];

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prev => [...prev, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAddMovie={handleAddMovie} />
      </div>
    </div>
  );
};
