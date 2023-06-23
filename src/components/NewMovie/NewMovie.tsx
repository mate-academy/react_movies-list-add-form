import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void,
};

const initialForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState(initialForm);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formState;

  // const newMovieData = {
  //   title,
  //   description,
  //   imgUrl,
  //   imdbUrl,
  //   imdbId,
  // };

  const isRequiredDataProvided = title && imgUrl && imdbUrl && imdbId;

  const cleanForm = () => {
    setFormState(initialForm);
    setCount((prevCount) => (prevCount + 1));
  };

  const submitData = () => {
    onAdd(formState);
    cleanForm();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitData();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
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
            disabled={!isRequiredDataProvided}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
