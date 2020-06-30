import React from 'react';
import PropTypes from 'prop-types';

export const Field = ({ name, err, handleChange, validation, value }) => {
  let option;

  if(name.includes('Url')) {
    option = 'url';
  } else if (name === 'title' || name === 'imdbId') {
    option = 5;
  } else {
    option = 30;
  }

  return (
    <div>
      <input
        value={value}
        placeholder={name}
        type="text"
        name={`${name}`}
        onChange={ev => handleChange(ev)}
        onBlur={ev => validation(ev.target.name, ev.target.value, option)}
      />
      <p className="errors">{err}</p>
    </div>
  )
};

Field.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
  imdbUrl: PropTypes.string.isRequired,
};

