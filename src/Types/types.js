import PropTypes from 'prop-types';

export const ErrorType = PropTypes.shape({
  title: PropTypes.bool.isRequired,
  imgUrl: PropTypes.bool.isRequired,
  imdbUrl: PropTypes.bool.isRequired,
  imdbId: PropTypes.bool.isRequired,
});
