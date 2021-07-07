import React from 'react';
import PropTypes from 'prop-types';

export const ErrorMessage = props => (
  <div className="invalid-feedback">
    {`Please type valid ${props.name}.`}
  </div>
);

ErrorMessage.propTypes = {
  name: PropTypes.string.isRequired,
};
