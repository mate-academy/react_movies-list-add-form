import React, { useState } from 'react';
import { TextField } from '../TextField';

interface Props {
  onAdd: CallableFunction;
}
export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, increaseCount] = useState(0);
  const [newMovie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const allFieldsAreValid = Object.entries(newMovie)
    .every(([movieField, movieValue]) => (
      movieField === 'description' || movieValue
    ));
  const addMovieField = (key: string, value: string) => {
    setMovie({
      ...newMovie,
      [key]: value,
    });
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        increaseCount(count + 1);
        onAdd(newMovie);
        setMovie({
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        });
      }}
    >
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={addMovieField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={addMovieField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={addMovieField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={addMovieField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={addMovieField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allFieldsAreValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
