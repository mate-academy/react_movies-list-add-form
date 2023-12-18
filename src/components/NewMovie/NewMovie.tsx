import { useState } from 'react';
import { newMovieFormFields as formFields } from '../../enums';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const emptyFormFields: Movie = formFields
  .reduce((prev, { name }) => ({
    ...prev,
    [name]: '',
  }), {} as Movie);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieData, setMovieData] = useState(emptyFormFields);

  const requiredFields = formFields.filter(({ required }) => required);

  const areRequiredFieldsEmpty = requiredFields
    .some(({ name }) => !movieData[name].trim());

  const areInvalidFields = requiredFields
    .some(({ name, validationCallback }) => (
      validationCallback ? !validationCallback(movieData[name]) : false
    ));

  const isInvalidInputs = areRequiredFieldsEmpty || areInvalidFields;

  const handleInputChange = (key: keyof Movie, newValue: string) => {
    setMovieData({
      ...movieData,
      [key]: newValue,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isInvalidInputs) {
      return;
    }

    onAdd(movieData);
    setMovieData(emptyFormFields);
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      {formFields.map(({
        name,
        label,
        required,
        validationCallback,
        validationErrorMessage,
      }) => (
        <TextField
          key={name}
          name={name}
          label={label}
          value={movieData[name]}
          onChange={(value) => handleInputChange(name, value)}
          required={required}
          onValidate={validationCallback}
          validationErrorMessage={validationErrorMessage}
        />
      ))}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isInvalidInputs}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
