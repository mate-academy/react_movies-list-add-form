import PropTypes from 'prop-types';

export const InputShape = {
  title: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  validator: PropTypes.bool.isRequired,
};
