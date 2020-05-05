import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ text }) => (
  <div className="form__error">
    {text}
  </div>
);

Error.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Error;
