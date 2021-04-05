import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ btnTitle, btnAction }) => (
  <button
    type="button"
    className="btn"
    onClick={btnAction}
  >
    {btnTitle}
  </button>
);

Button.propTypes = {
  btnTitle: PropTypes.string.isRequired,
  btnAction: PropTypes.func.isRequired,
};

export default Button;
