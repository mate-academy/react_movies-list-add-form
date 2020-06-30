import React from 'react';
import PropTypes from 'prop-types';

export const Field = ({ name, err, handleChange, validation, value, valid}) => {
  let option;
  let classTitle;

  if (name.includes('Url')) {
    option = 'url';
  } else if (name === 'title' || name === 'imdbId') {
    option = 5;
  } else {
    option = 30;
  }

  if (valid === false) {
    classTitle = 'no-verified';
  } else if (valid === true) {
    classTitle = 'accepted';
  } else {
    classTitle = 'before-verification';
  }

  return (
    <div>
      <input
        className={classTitle}
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

