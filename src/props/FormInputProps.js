import PropTypes from 'prop-types';

export const FormInputProps = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  textError: PropTypes.string,
};
