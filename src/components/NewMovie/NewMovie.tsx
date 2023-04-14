import { useState, FormEvent } from 'react';
import { TextField, isFieldValid } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

const formFields = {
  title: { name: 'title', label: 'Title' },
  description: { name: 'description', label: 'Description' },
  imgUrl: { name: 'imgUrl', label: 'Image URL' },
  imdbUrl: { name: 'imdbUrl', label: 'IMDb URL' },
  imdbId: { name: 'imdbId', label: 'IMDb ID' },
} as const;

const emptyMovie = Object.keys(formFields)
  .reduce((acc, key) => ({ ...acc, [key]: '' }), {} as Movie);

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formValues, setFormValues] = useState<Movie>(emptyMovie);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleChange = (fieldName: keyof Movie, value: string) => {
    const updatedFormValues = { ...formValues, [fieldName]: value };
    const areFieldsValid = Object.entries(updatedFormValues)
      .every(([field, input]) => isFieldValid(field as keyof Movie, input));

    setFormValues(updatedFormValues);
    setIsFormValid(areFieldsValid);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(formValues);
    setFormValues(emptyMovie);
    const addButton = event.currentTarget.querySelector('[type="submit"]');

    addButton?.setAttribute('disabled', 'true');
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>
      {Object.values(formFields).map(({ name, label }) => (
        <TextField
          key={name}
          name={name}
          label={label}
          value={formValues[name]}
          onChange={(value) => handleChange(name, value)}
          required={['title', 'imgUrl', 'imdbUrl', 'imdbId'].includes(name)}
        />
      ))}
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
