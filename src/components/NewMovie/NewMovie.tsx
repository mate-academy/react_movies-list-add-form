import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
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

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const isFormValid = title.trim() !== '' && imgUrl.trim() !== ''
    && imdbUrl.trim() !== '' && imdbId.trim() !== '';

  const handleChange = (event: string, value: string) => {
    setNewMovie({
      ...newMovie,
      [event]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      // alert('Please fill in all required fields.');

      return;
    }

    onAdd(newMovie);

    reset();
    setCount(value => value + 1);
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
        onChange={(newValue) => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => handleChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => handleChange('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => handleChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
