import React from 'react';
import PropsType from 'prop-types';

const TextField = ({
  name,
  changeHandler,
  value,
  errors,
  blurHandler,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="font-weight-bold">
        {`Movie ${name}`}
      </label>
      <input
        className={`form-control ${errors[name] ? 'border border-danger' : ''}`}
        id={name}
        type="text"
        name={name}
        value={value}
        placeholder={
          `${(name === 'imgUrl' || name === 'imdbUrl')
            ? 'https://amazon.com/images/pict.jpg'
            : `Enter ${name}`}`}
        aria-describedby="inputText"
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      {errors[name] && (
        <small id="inputText" className="form-text text-danger">
          {`Field ${name} ${errors[name]}`}
        </small>
      )}
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

export default TextField;
