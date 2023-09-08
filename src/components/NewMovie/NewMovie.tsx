import React, { useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [filmData, setFilmData] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const changeFilmData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilmData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const filmDataKeys = Object.keys(filmData);
  const isFormFilled = Object.values(filmData)
    .every((value, index) => {
      return Boolean(value.trim()) || filmDataKeys[index] === 'description';
    });

  const clearFields = () => setFilmData({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormFilled) {
      return;
    }

    onAdd(filmData);

    clearFields();
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={filmData.title}
        onChange={changeFilmData}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={filmData.description}
        onChange={changeFilmData}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={filmData.imgUrl}
        onChange={changeFilmData}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={filmData.imdbUrl}
        onChange={changeFilmData}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={filmData.imdbId}
        onChange={changeFilmData}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
