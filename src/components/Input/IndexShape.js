import PropTypes from 'prop-types';

export const InputShape = {
  name: PropTypes.string.isRequired,
  onBlurChecker: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
