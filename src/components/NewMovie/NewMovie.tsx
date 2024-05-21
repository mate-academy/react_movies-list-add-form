import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';

type FormValues = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type NewMovieProps = {
  onAdd: (newMovie: FormValues) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (fieldName: keyof FormValues, value: string) => {
    setFormValues(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const isFormValid = ['title', 'imgUrl', 'imdbUrl', 'imdbId'].every(
    field => formValues[field as keyof FormValues].trim() !== '',
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    // Add the new movie
    onAdd(formValues);

    // Clear the form
    setFormValues({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

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
        value={formValues.imdbUrl}
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
