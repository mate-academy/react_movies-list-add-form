import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const DEFAULT_STATE = {
  count: 0,
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  title: '',
  description: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [field, setField] = useState(DEFAULT_STATE);
  const {
    count,
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = field;

  const unSuccessForm = !(
    field.title
    && field.imgUrl
    && field.imdbUrl
    && field.imdbId
  ).trim();

  const handleChange = (newValue: string, inputName: string) => {
    setField({
      ...field,
      [inputName]: newValue,
    });
  };

  const resetFields = () => {
    setField(state => ({
      ...DEFAULT_STATE,
      count: state.count + 1,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    resetFields();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
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
