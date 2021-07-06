import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

export const ErrorMessage = ({ message }) => (
  <span className="form__error">{message}</span>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
