import PropTypes from 'prop-types';

export const InputShape = {
  inputValue: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  addChange: PropTypes.func.isRequired,
};
