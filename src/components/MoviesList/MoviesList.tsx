import React from 'react';
import './MoviesList.scss';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';

interface Props {
  movies: Movie[];
}

export const MoviesList: React.FC<Props> = ({ movies }) => (
  <div className="movies">
    {movies.map((movie, index) => (
      <MovieCard key={`${movie.imdbId}-${index}`} movie={movie} />
    ))}
  </div>
);
