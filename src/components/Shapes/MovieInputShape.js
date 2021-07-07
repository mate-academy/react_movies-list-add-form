import PropTypes from 'prop-types';

export const MovieInputShape = PropTypes.shape({
  onChangeInput: PropTypes.func.isRequired,
  handleValidate: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
});
