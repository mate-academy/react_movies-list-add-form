import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((prevMovie: Movie) => (
      { ...prevMovie, [name]: value }
    ));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setSubmitDisabled(true);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <form
      key={count}
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        required
        name="title"
        label="Title"
        value={title}
        onChange={(event) => {
          handleChange(event);
          setSubmitDisabled(
            !event.target.value.trim()
            || !imgUrl.trim()
            || !imdbUrl.trim()
            || !imdbId.trim(),
          );
        }}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        required
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => {
          handleChange(event);
          setSubmitDisabled(
            !title.trim()
            || !event.target.value.trim()
            || !imdbUrl.trim()
            || !imdbId.trim(),
          );
        }}
      />

      <TextField
        required
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          handleChange(event);
          setSubmitDisabled(
            !title.trim()
            || !imgUrl.trim()
            || !event.target.value.trim()
            || !imdbId.trim(),
          );
        }}
      />

      <TextField
        required
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => {
          handleChange(event);
          setSubmitDisabled(
            !title.trim()
            || !imgUrl.trim()
            || !imdbUrl.trim()
            || !event.target.value.trim(),
          );
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
