import PropTypes from 'prop-types';

export const TextFieldShape = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export const NewMovieShape = {
  onAaddMovie: PropTypes.func.isRequired,
};
