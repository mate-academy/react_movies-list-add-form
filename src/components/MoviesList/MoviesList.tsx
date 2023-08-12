import React from 'react';

import './MoviesList.scss';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';

interface Props {
  movies: Movie[];
  theme: string;
}

export const MoviesList: React.FC<Props> = ({ movies, theme }) => (
  <div className="movies">
    {movies.map(movie => (
      <MovieCard
        key={movie.imdbId}
        movie={movie}
        theme={theme}
      />
    ))}
  </div>
);
