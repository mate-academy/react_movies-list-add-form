import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { checkValidation } from '../../helpers/validation';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
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

    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const movie: Movie = {
      ...newMovie,
    };

    onAdd(movie);

    reset();
  };

  const isDisabled = (
    !(title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim())
    || !(checkValidation(imgUrl) && checkValidation(imdbUrl)));

  const handleChange = (
    name: keyof Movie,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;

    setNewMovie((prevMovie: Movie) => ({
      ...prevMovie,
      [name]: value,
    }));
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
        onChange={(event) => handleChange('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => handleChange('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => handleChange('imgUrl', event)}
        onValidate={checkValidation}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => handleChange('imdbUrl', event)}
        onValidate={checkValidation}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => handleChange('imdbId', event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
