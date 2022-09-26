import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const onBlur = !title || !imgUrl || !imdbUrl || !imdbId;

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const handleCheck = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);
    setCount(prev => prev + 1);
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbId('');
    setimdbUrl('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleCheck}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => {
          setTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => {
          setDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={imgUrl}
        onChange={(event) => {
          setimgUrl(event);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={imdbUrl}
        onChange={(event) => {
          setimdbUrl(event);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={imdbId}
        onChange={(event) => {
          setimdbId(event);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={onBlur}
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
