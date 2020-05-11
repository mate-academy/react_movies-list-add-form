import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

export const MessageWarning = () => (
  <Message
    warning
    header="Error!"
    content="All form fields must be filled out."
  />
);

export const MessageSuccess = ({ isValid, isFetching }) => (
  <Message
    success={isValid && isFetching}
    header="Success!"
    content="All form fields are filled in correctly."
  />
);

MessageSuccess.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};
