import PropTypes from 'prop-types';

export const InputFormTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export const NewMovieTypes = {
  onAaddMovie: PropTypes.func.isRequired,
};
