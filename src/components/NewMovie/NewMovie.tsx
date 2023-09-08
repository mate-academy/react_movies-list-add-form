import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie)=> void;
};

const DEFAULT_VALUE = '';

const allFields = {
  title: DEFAULT_VALUE,
  description: DEFAULT_VALUE,
  imgUrl: DEFAULT_VALUE,
  imdbUrl: DEFAULT_VALUE,
  imdbId: DEFAULT_VALUE,
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [fieldsForms, setFieldsForms] = useState(allFields);

  const isSubmitDisabled = !fieldsForms.title
    || !fieldsForms.imgUrl
    || !fieldsForms.imdbUrl
    || !fieldsForms.imdbId;

  const resetField = () => {
    setFieldsForms(allFields);
  };

  const handleMovie = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: fieldsForms.title,
      description: fieldsForms.description,
      imgUrl: fieldsForms.imgUrl,
      imdbUrl: fieldsForms.imdbUrl,
      imdbId: fieldsForms.imdbId,
    };

    onAdd(newMovie);
    setCount((prevState) => prevState + 1);

    resetField();
  };

  const updateTitleField = (fieldName: string, newValue: string) => {
    setFieldsForms((prevState) => ({ ...prevState, [fieldName]: newValue }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={fieldsForms.title}
        onChange={(newValue) => updateTitleField('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={fieldsForms.description}
        onChange={(newValue) => updateTitleField('description', newValue)}

      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={fieldsForms.imgUrl}
        onChange={(newValue) => updateTitleField('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={fieldsForms.imdbUrl}
        onChange={(newValue) => updateTitleField('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={fieldsForms.imdbId}
        onChange={(newValue) => updateTitleField('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isSubmitDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
