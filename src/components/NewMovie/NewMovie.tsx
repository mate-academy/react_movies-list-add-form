import React, { useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(movie: Movie): void;
};

const defaultForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formInfo, setFormInfo] = useState<Movie>(defaultForm);
  const [key, setKey] = useState(0);

  const isValidForm =
    formInfo.title && formInfo.imgUrl && formInfo.imdbUrl && formInfo.imdbId;

  const handleAddMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(formInfo);
    setFormInfo(defaultForm);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <form className="NewMovie" onSubmit={handleAddMovie} key={key}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formInfo.title}
        required
        onChange={value => {
          setFormInfo({ ...formInfo, title: value });
        }}
      />

      <TextField
        name="description"
        label="Description"
        value={formInfo.description}
        onChange={value => {
          setFormInfo({ ...formInfo, description: value });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formInfo.imgUrl}
        onChange={value => {
          setFormInfo({ ...formInfo, imgUrl: value });
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formInfo.imdbUrl}
        onChange={value => {
          setFormInfo({ ...formInfo, imdbUrl: value });
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formInfo.imdbId}
        onChange={value => {
          setFormInfo({ ...formInfo, imdbId: value });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
