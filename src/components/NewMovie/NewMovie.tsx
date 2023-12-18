import { useState } from 'react';
import { newMovieFormFields as formFields } from '../../enums';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const emptyFields: Movie = formFields
  .reduce((prev, { name }) => ({
    ...prev,
    [name]: '',
  }), {} as Movie);

const requiredFields = formFields.filter(({ required }) => required);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieFormFields, setMovieFormFields] = useState(emptyFields);

  const areRequiredFieldsEmpty = requiredFields
    .some(({ name }) => !movieFormFields[name].trim());

  const areRequiredFieldsInvalid = requiredFields
    .some(({ name, validationCallback }) => (
      validationCallback ? !validationCallback(movieFormFields[name]) : false
    ));

  const isFormFieldsValid = areRequiredFieldsEmpty || areRequiredFieldsInvalid;

  const handleInputChange = (key: keyof Movie, newValue: string) => {
    setMovieFormFields({
      ...movieFormFields,
      [key]: newValue,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormFieldsValid) {
      return;
    }

    onAdd(movieFormFields);
    setMovieFormFields(emptyFields);
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
          value={movieFormFields[name]}
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
            disabled={isFormFieldsValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
