import PropTypes from 'prop-types';

export const NewMovieShape = PropTypes.shape({
  addMovie: PropTypes.func,
});

export const MovieCardShape = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes,
  imgUrl: PropTypes.string,
  imdbUrl: PropTypes.string,
});

export const MoviesListShape = PropTypes.shape({
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      imgUrl: PropTypes.string,
      imdbUrl: PropTypes.string,
    }),
  ),
});
