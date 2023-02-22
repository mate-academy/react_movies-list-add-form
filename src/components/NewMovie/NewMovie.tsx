import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const emptyState = {
    count: 0,
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    title: '',
    description: '',
  };

  const [field, setField] = useState(emptyState);

  const unSuccessForm = !(
    field.title
    && field.imgUrl
    && field.imdbUrl
    && field.imdbId
  );

  const handleChange = (newValue: string, inputName: string) => {
    setField({
      ...field,
      [inputName]: newValue,
    });
  };

  const resetFields = () => {
    setField(state => ({
      ...emptyState,
      count: state.count + 1,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title: field.title,
      description: field.description,
      imgUrl: field.imgUrl,
      imdbUrl: field.imdbUrl,
      imdbId: field.imdbId,
    });
    resetFields();
  };

  return (
    <form
      className="NewMovie"
      key={field.count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={field.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={field.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={field.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={field.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={field.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={unSuccessForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
