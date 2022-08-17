import React, { FormEvent } from 'react';
import { TextField } from '../TextField';

type Props = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setImgUrl: (imgUrl: string) => void;
  setImdbUrl: (imdbUrl: string) => void;
  setImdbId: (imdbId: string) => void;
  hasError: boolean;
  submit: (event: FormEvent) => void;
  count: number;
};

export const NewMovie: React.FC<Props> = ({
  title,
  description,
  imgUrl,
  imdbUrl,
  imdbId,
  setTitle,
  setDescription,
  setImgUrl,
  setImdbUrl,
  setImdbId,
  hasError,
  submit,
  count,
}) => {
  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
