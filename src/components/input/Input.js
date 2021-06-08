import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ title, value, onAdd, transformText }) => {
  return (
    <label
      className="new-movie__label"
    >
      {transformText(title)}
      <input
        className="new-movie__input"
        name={title}
        value={value}
        onChange={onAdd}
      />
    </label>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  transformText: PropTypes.func.isRequired,
};
