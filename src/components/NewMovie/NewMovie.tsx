import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaultMovieData = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movieData, setMovieData] = useState(defaultMovieData);
  const [count, setCount] = useState(0);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movieData;

  const reset = () => {
    setMovieData(defaultMovieData);
  };

  const handleChange = (field: string, newValue: string) => {
    setMovieData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    reset();
    setCount((prevCount) => prevCount + 1);
  };

  const checkCorrect = !title.trim()
    || !imgUrl.trim()
    || !imdbUrl.trim()
    || !imdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAdd}
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
            disabled={checkCorrect}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
