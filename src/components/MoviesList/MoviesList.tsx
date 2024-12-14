import React from 'react';

import './MoviesList.scss';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';

interface Props {
  movies: Movie[];
}

export const MoviesList: React.FC<Props> = ({ movies }) => {
  const uniqueMovies = movies.filter(
    (movie, index, arr) =>
      arr.findIndex(m => m.imdbId === movie.imdbId) === index,
  );

  return (
    <div className="movies">
      {uniqueMovies.map(movie => (
        <MovieCard key={movie.imdbId} movie={movie} />
      ))}
    </div>
  );
};
