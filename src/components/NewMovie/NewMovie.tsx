import React, { FormEvent, useState } from 'react';
import {
  fieldsInitialState,
  PATTERN_URL,
  PATTERN_URL_IMAGE,
  validationsInitialState,
} from '../../constants';
import { Movie, FieldType } from '../../types/typedefs';
import { TextField, HandleTextFieldType } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `FieldType`s
  const [count, setStatus] = useState(0);
  const [fieldsValues, setFieldsValues] = useState(fieldsInitialState);

  const [
    fieldsValidations,
    setFieldsValidations,
  ] = useState(validationsInitialState);

  const handleFieldChange: HandleTextFieldType = (name, value, status) => {
    setFieldsValues((state) => ({
      ...state,
      [name]: value,
    }));

    if (name !== FieldType.DESCRIPTION) {
      setFieldsValidations((state) => ({
        ...state,
        [name]: status,
      }));
    }
  };

  const clearForm = () => {
    setFieldsValidations(validationsInitialState);
    setFieldsValues(fieldsInitialState);
    setStatus(prev => prev + 1);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({ ...fieldsValues });
    clearForm();
  };

  const couldSubmitForm = Object.values(fieldsValidations)
    .every(value => value);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name={FieldType.TITLE}
        label="Title"
        value={fieldsValues[FieldType.TITLE]}
        onChange={handleFieldChange}
        required
      />

      <TextField
        name={FieldType.DESCRIPTION}
        label="Description"
        value={fieldsValues[FieldType.DESCRIPTION]}
        onChange={handleFieldChange}
      />

      <TextField
        name={FieldType.IMAGEURL}
        label="Image URL"
        value={fieldsValues[FieldType.IMAGEURL]}
        isValid={fieldsValidations[FieldType.IMAGEURL]}
        onChange={handleFieldChange}
        validationPattern={PATTERN_URL_IMAGE}
        required
      />

      <TextField
        name={FieldType.IMDBURL}
        label="Imdb URL"
        value={fieldsValues[FieldType.IMDBURL]}
        isValid={fieldsValidations[FieldType.IMDBURL]}
        validationPattern={PATTERN_URL}
        onChange={handleFieldChange}
        required
      />

      <TextField
        name={FieldType.IMDBID}
        label="Imdb ID"
        value={fieldsValues[FieldType.IMDBID]}
        onChange={handleFieldChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!couldSubmitForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
