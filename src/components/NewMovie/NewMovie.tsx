import { useState, FormEvent } from 'react';
import { TextField, isFieldValid } from '../TextField';
import { Movie } from '../../types/Movie';
import { FieldNames, FieldLabels } from '../../types/Fields';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

const emptyMovie = Object.values(FieldNames).reduce(
  (acc, key) => ({ ...acc, [key]: '' }),
  {} as Movie,
);

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formValues, setFormValues] = useState<Movie>(emptyMovie);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const handleChange = (fieldName: keyof Movie, value: string) => {
    const updatedFormValues: Movie = { ...formValues, [fieldName]: value };
    const areFieldsValid = Object.entries(updatedFormValues)
      .every(([field, input]) => isFieldValid(field as keyof Movie, input));

    setFormValues(updatedFormValues);
    setIsFormValid(areFieldsValid);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onAdd(formValues);
    setFormValues(emptyMovie);
    setIsFormValid(false);
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>
      {Object.values(FieldNames).map((fieldName) => {
        const isRequired = fieldName !== FieldNames.Description;

        return (
          <TextField
            key={fieldName}
            name={fieldName}
            label={FieldLabels[fieldName]}
            value={formValues[fieldName]}
            onChange={(value) => handleChange(fieldName, value)}
            required={isRequired}
          />
        );
      })}
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
