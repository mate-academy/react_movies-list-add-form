import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidUrl } from '../../Servises/isValidUrl';

type Props = {
  onAdd: (posts: Movie) => void
};

const valuesOfForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [fieldsForm, setfieldsForm] = useState<Movie>(valuesOfForm);

  const isValidImgUrl = isValidUrl(fieldsForm.imgUrl);
  const isValidImdbUrl = isValidUrl(fieldsForm.imdbUrl);

  const handleChangeInputs = (event: string, name: string) => {
    setfieldsForm(current => ({ ...current, [name]: event }));
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(fieldsForm);
    setCount(current => current + 1);
    setfieldsForm(valuesOfForm);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={fieldsForm.title}
        onChange={handleChangeInputs}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={fieldsForm.description}
        onChange={handleChangeInputs}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={fieldsForm.imgUrl}
        onChange={handleChangeInputs}
        isValidImgUrl={isValidImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={fieldsForm.imdbUrl}
        onChange={handleChangeInputs}
        isValidImdbUrl={isValidImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={fieldsForm.imdbId}
        onChange={handleChangeInputs}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !fieldsForm.title
              || !fieldsForm.imgUrl
              || !fieldsForm.imdbUrl
              || !fieldsForm.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
