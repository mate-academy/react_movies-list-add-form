/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Field {
  name: keyof Movie;
  label: string;
  required?: boolean;
}

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formState, setFormState] = useState<
  Record<keyof Movie, { value: string; touched: boolean; error: string }>
  >({
    title: { value: '', touched: false, error: '' },
    description: { value: '', touched: false, error: '' },
    imgUrl: { value: '', touched: false, error: '' },
    imdbUrl: { value: '', touched: false, error: '' },
    imdbId: { value: '', touched: false, error: '' },
  });

  const fields: Field[] = [
    { name: 'title', label: 'Title', required: true },
    { name: 'description', label: 'Description' },
    { name: 'imgUrl', label: 'Image URL', required: true },
    { name: 'imdbUrl', label: 'IMDb URL', required: true },
    { name: 'imdbId', label: 'IMDb ID', required: true },
  ];

  const validateField = (name: keyof Movie, value: string): string => {
    if (fields.find(field => field.name === name)?.required && !value.trim()) {
      return 'This field is required';
    }

    return '';
  };

  const handleChange = (name: keyof Movie, value: string) => {
    const error = validateField(name, value);

    setFormState({
      ...formState,
      [name]: { ...formState[name], value, error },
    });
  };

  const handleBlur = (name: keyof Movie) => {
    const error = validateField(name, formState[name].value);

    setFormState({
      ...formState,
      [name]: { ...formState[name], touched: true, error },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie: Movie = {
      title: formState.title.value,
      description: formState.description.value || '',
      imgUrl: formState.imgUrl.value,
      imdbUrl: formState.imdbUrl.value,
      imdbId: formState.imdbId.value,
    };

    onAdd(newMovie);
    setFormState({
      title: { value: '', touched: false, error: '' },
      description: { value: '', touched: false, error: '' },
      imgUrl: { value: '', touched: false, error: '' },
      imdbUrl: { value: '', touched: false, error: '' },
      imdbId: { value: '', touched: false, error: '' },
    });
  };

  const isFormValid = fields.every(
    field =>
      !field.required ||
      (formState[field.name].value.trim() && !formState[field.name].error),
  );

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {fields.map(field => (
        <TextField
          key={field.name}
          name={field.name}
          label={field.label}
          value={formState[field.name].value}
          onChange={value => handleChange(field.name, value)}
          onBlur={() => handleBlur(field.name)}
          required={field.required}
          error={
            formState[field.name].touched ? formState[field.name].error : ''
          }
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
