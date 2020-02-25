import React from 'react';
import PropsType from 'prop-types';

export const TextField = (props) => {
  const {
    name,
    changeHandler,
    value,
    errors,
    blurHandler,
  } = props;

  return (
    <div className="field">
      <label htmlFor={name} className="label">{`Movie ${name}`}</label>
      <input
        className={`input ${errors[name] ? 'is-danger' : ''}`}
        id={name}
        type="text"
        name={name}
        value={value}
        placeholder={`Enter ${name}...`}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      {errors[name]
      && <p className="help is-danger">{`This field ${errors[name]}`}</p>}
    </div>
  );
};

TextField.propTypes = {
  name: PropsType.string.isRequired,
  changeHandler: PropsType.func.isRequired,
  blurHandler: PropsType.func.isRequired,
  value: PropsType.string.isRequired,
  errors: PropsType.shape({
    title: PropsType.string,
    imgUrl: PropsType.string,
    imdbUrl: PropsType.string,
    imdbId: PropsType.string,
  }).isRequired,
};
