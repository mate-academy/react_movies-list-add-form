import PropTypes from 'prop-types';
import React from 'react';
import { Input } from '../Input';
import { ErrorType } from '../../Types/types';

export function Inputs({
  hasWarning,
  onChange,
  onBlur,
  requiredFields,
}) {
  const movieFieldsRequired = Object.keys(requiredFields);

  return (
    <>
      {movieFieldsRequired.map((field) => {
        return (
          <Input
            key={field}
            value={requiredFields[field]}
            name={field}
            onChange={onChange}
            onBlur={onBlur}
            hasWarning={hasWarning}
          />
        );
      })}
    </>
  );
}

Inputs.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  requiredFields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    imdbUrl: PropTypes.string.isRequired,
    imdbId: PropTypes.string.isRequired,
  }).isRequired,
  hasWarning: ErrorType.isRequired,
};
