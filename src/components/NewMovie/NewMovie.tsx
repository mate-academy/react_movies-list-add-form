import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState({
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
  } = formState;

  const newMovieData = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const isEveryRequiredDataProvided = title && imgUrl && imdbUrl && imdbId;

  const cleanForm = () => {
    setFormState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount((prevCount) => (prevCount + 1));
  };

  const submitData = () => {
    onAdd(newMovieData);
    cleanForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        submitData();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(key, newData) => (
          setFormState((prevForm) => ({
            ...prevForm,
            [key]: newData,
          }))
        )}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(key, newData) => (
          setFormState((prevForm) => ({
            ...prevForm,
            [key]: newData,
          }))
        )}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(key, newData) => (
          setFormState((prevForm) => ({
            ...prevForm,
            [key]: newData,
          }))
        )}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(key, newData) => (
          setFormState((prevForm) => ({
            ...prevForm,
            [key]: newData,
          }))
        )}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(key, newData) => (
          setFormState((prevForm) => ({
            ...prevForm,
            [key]: newData,
          }))
        )}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isEveryRequiredDataProvided}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
