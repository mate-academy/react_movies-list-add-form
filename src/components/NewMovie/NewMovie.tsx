import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (value: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleRequiredFields = () => {
    if (
      newMovie.title &&
      newMovie.imgUrl &&
      newMovie.imdbUrl &&
      newMovie.imdbId
    ) {
      return false;
    }

    return true;
  };

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleChange = (
    fieldName: keyof typeof newMovie,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;

    setNewMovie((prevMovie: Movie) => ({ ...prevMovie, [fieldName]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setErrors(prevError => ({
      ...prevError,
      title: !newMovie.title,
      imgUrl: !newMovie.imgUrl,
      imdbUrl: !newMovie.imdbUrl,
      imdbId: !newMovie.imdbId,
    }));

    if (errors.title || errors.imgUrl || errors.imdbUrl || errors.imdbId) {
      return;
    }

    onAdd({
      title: newMovie.title,
      description: newMovie.description,
      imgUrl: newMovie.imgUrl,
      imdbUrl: newMovie.imdbUrl,
      imdbId: newMovie.imdbId,
    });

    setCount(prev => prev + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={e => {
          handleChange('title', e);
          handleRequiredFields();
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={e => {
          handleChange('description', e);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={e => {
          handleChange('imgUrl', e);
          handleRequiredFields();
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={e => {
          handleChange('imdbUrl', e);
          handleRequiredFields();
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={e => {
          handleChange('imdbId', e);
          handleRequiredFields();
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={handleRequiredFields()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
