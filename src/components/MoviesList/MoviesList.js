import React from 'react';
import PropTypes from 'prop-types';

import './MoviesList.scss';
import { MovieCard } from '../MovieCard';

export const MoviesList = ({ movies, filter }) => (
  <div className="movies">
    {movies.filter(movie => movie.title
      .toLowerCase().includes(filter.toLowerCase())
        || movie.description
          .toLowerCase().includes(filter.toLowerCase()))
      .map(movie => (
        <MovieCard key={movie.imdbId} {...movie} />
      ))}
  </div>
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      imgUrl: PropTypes.string.isRequired,
      imdbUrl: PropTypes.string.isRequired,
    }),
  ),
  filter: PropTypes.string,
};

MoviesList.defaultProps = {
  movies: [],
  filter: '',
};
