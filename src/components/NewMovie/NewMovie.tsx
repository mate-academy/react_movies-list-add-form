import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

const formBlank = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const pattern = new RegExp(
  /^((([A-Za-z]{3,9}:(?:\/\/)?)/.source
  + /(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]/.source
  + /+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)/.source
  + /((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)/.source
  + /#?(?:[,.!/\\\w]*))?)$/.source,
);

const validateUrl = (url: string) => pattern.test(url);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState(formBlank);
  const [count, setCount] = useState(0);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = form;

  const formChangeHandler = (key: string, value: string) => {
    setForm(state => ({
      ...state,
      [key]: value,
    }));
  };

  const isDisabled = !title || !imgUrl || !imdbUrl
    || !imdbId || !validateUrl(imgUrl) || !validateUrl(imdbUrl);

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(form);
    setCount(count + 1);
    setForm(formBlank);
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => formChangeHandler('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => formChangeHandler('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => formChangeHandler('imgUrl', value)}
        validation={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => formChangeHandler('imdbUrl', value)}
        validation={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => formChangeHandler('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
