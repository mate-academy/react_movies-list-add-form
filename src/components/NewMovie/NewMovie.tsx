import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie)=> void,
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const onReset = () => {
    setCount(current => current + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  let disabledAdd = true;
  const isFormNotValid = title === '' || imgUrl === ''
    || imdbUrl === '' || imdbId === '';

  if (isFormNotValid) {
    disabledAdd = true;
  } else {
    disabledAdd = false;
  }

  const createMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormNotValid) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    onReset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={createMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onChange={(e) => {
          setTitle(e);
        }}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(e) => {
          setDescription(e);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={(e) => {
          setImgUrl(e);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={(e) => {
          setImdbUrl(e);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(e) => {
          setImdbId(e);
        }}

      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledAdd}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
