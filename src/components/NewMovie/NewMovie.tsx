import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [validUrl, setValidUrl] = useState(true);

  const handlerChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handlerChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handlerChangeImgUrl = (value: string) => {
    setImgUrl(value);
  };

  const handlerChangeImdbUrl = (value: string) => {
    setImdbUrl(value);
  };

  const handlerChangeImdbId = (value: string) => {
    setImdbId(value);
  };

  const handlerCheckValidURL = (value: boolean) => {
    setValidUrl(value);
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(count + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setValidUrl(true);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlerSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handlerChangeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handlerChangeDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        urlsValid
        onCheckIsValidUrl={handlerCheckValidURL}
        onChange={handlerChangeImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        urlsValid
        onCheckIsValidUrl={handlerCheckValidURL}
        onChange={handlerChangeImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handlerChangeImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId || !validUrl}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
