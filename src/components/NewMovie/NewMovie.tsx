import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

const initialValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [movieData, setMovieData] = useState(initialValues);

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = movieData;

  const newMovieData = title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim();

  function clearForm() {
    setMovieData(initialValues);
    setCount(prev => prev + 1);
  }

  function handleChange(newValue: string, field: keyof Movie) {
    setMovieData({ ...movieData, [field]: newValue });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd(movieData);
    clearForm();
  }

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
        onChange={(newValue) => handleChange(newValue, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => handleChange(newValue, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => handleChange(newValue, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => handleChange(newValue, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => handleChange(newValue, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!newMovieData}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
