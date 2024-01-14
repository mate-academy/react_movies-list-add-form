/* eslint-disable max-len */
import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaultMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(defaultMovie);

  const addNewValue = (title: string, value: string) => {
    setNewMovie((prevMovies) => ({
      ...prevMovies,
      [title]: value,
    }));
  };

  const validateUrl = (url: string) => {
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return !pattern.test(url);
  };

  const disabledBtn = !newMovie.title.trim()
  || !newMovie.imgUrl.trim()
  || !newMovie.imdbUrl.trim()
  || !newMovie.imdbId.trim()
  || validateUrl(newMovie.imgUrl)
  || validateUrl(newMovie.imdbUrl);

  const handleSubmit = () => {
    onAdd(newMovie);
    setNewMovie(defaultMovie);
    setCount(count + 1);
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
        value={newMovie.title}
        onChange={e => addNewValue('title', e.target.value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={e => addNewValue('description', e.target.value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={e => addNewValue('imgUrl', e.target.value)}
        required
        validate={() => validateUrl(newMovie.imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={e => addNewValue('imdbUrl', e.target.value)}
        required
        validate={() => validateUrl(newMovie.imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={e => addNewValue('imdbId', e.target.value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledBtn}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
