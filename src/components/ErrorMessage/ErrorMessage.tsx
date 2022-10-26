// import React from 'react';
import './ErrorMessage.scss';

export const ErrorMessage = () => (
  <div className="notification error">
    <h2 className="notification__title">
      Error!
    </h2>
    <p>
      Please, enter valid URL.
    </p>
  </div>
);
