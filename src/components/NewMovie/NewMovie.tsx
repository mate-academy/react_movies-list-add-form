import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (newMovie: Movie) => void;
};

const defaultFormValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [formValues, setFormValues] = useState<Movie>(defaultFormValues);

  const requiredFields: Array<keyof Movie> = [
    'title',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ];

  const isFormValid: boolean = requiredFields.every(
    field => formValues[field].trim() !== '',
  );

  const handleChange = (fieldName: keyof Movie, value: string) => {
    setFormValues(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formValues);

    setFormValues(defaultFormValues);

    setCount(prevState => prevState + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={event => {
          handleChange('title', event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={event => {
          handleChange('description', event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={event => {
          handleChange('imgUrl', event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        onChange={event => {
          handleChange('imdbUrl', event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        onChange={event => {
          handleChange('imdbId', event);
        }}
        required
      />

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
