import React from 'react';

import './MoviesList.scss';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';

interface Props {
  movies: Movie[];
}

export const MoviesList: React.FC<Props> = ({ movies }) => (
  <ul className="movies">
    {movies.map(movie => (
      <li
        className="card"
        data-cy="movie-card"
        key={movie.imdbId}
      >
        <MovieCard
          movie={movie}
        />
      </li>
    ))}
  </ul>
);
