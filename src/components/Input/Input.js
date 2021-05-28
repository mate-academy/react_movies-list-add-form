import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

export const Input = ({ field, changeValue, setError, errors }) => {
  const [name, value] = field;
  let title;
  let type;

  switch (name) {
    case 'imgUrl':
      title = 'Film image URL';
      type = 'url';
      break;

    case 'imdbUrl':
      title = 'Film IMDB URL';
      type = 'url';
      break;

    case 'imdbId':
      title = 'Film IMDB id';
      type = 'text';
      break;

    default:
      title = name;
      type = 'text';
      break;
  }

  return (
    <label htmlFor={name} className="Input">
      {title}
      <input
        type={type}
        className={
          errors[name]
            ? 'Input__field Input__field_err'
            : 'Input__field'
        }
        name={name}
        id={name}
        placeholder={name}
        value={value}
        onChange={event => changeValue(event)}
        onBlur={event => setError(event.target)}
      />
      {errors[name] && (
        <div
          className="Input__error"
        >
          {
            (name === 'imgUrl'
            || name === 'imdbUrl')
              ? 'This url isn`t urlish enough'
              : 'Please, fill this field, kind sir'
          }
        </div>
      )}
    </label>
  );
};

Input.propTypes = {
  field: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeValue: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.bool,
  }).isRequired,
};
