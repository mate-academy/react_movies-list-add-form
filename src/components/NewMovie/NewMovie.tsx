import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie)=> void;
};

const defaultValue = '';

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(defaultValue);
  const [description, setDescription] = useState(defaultValue);
  const [imgUrl, setImgUrl] = useState(defaultValue);
  const [imdbUrl, setImdbUrl] = useState(defaultValue);
  const [imdbId, setImdbId] = useState(defaultValue);

  const isSubmitDisabled = !title || !imgUrl || !imdbUrl || !imdbId;

  const handleMovie = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTitle(defaultValue);
    setDescription(defaultValue);
    setImgUrl(defaultValue);
    setImdbUrl(defaultValue);
    setImdbId(defaultValue);
    setCount((prevState) => prevState + 1);
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
        value={title}
        onChange={(newValue) => setTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => setDescription(newValue)}

      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => setImgUrl(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => setImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => setImdbId(newValue)}
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
